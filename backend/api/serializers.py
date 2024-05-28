from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework import serializers
from rest_framework.fields import IntegerField, CharField, DateTimeField, SerializerMethodField
from rest_framework.relations import PrimaryKeyRelatedField

from food.models import Orders, Dishes, BrDishes, LunDishes, DinDishes, DishTypes, OrdersInChecks, Checks


class BrDrinkRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name="Напиток завтрака")


class BrMainRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name="Основное завтрака")


class LunDrinkRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name=["Напиток", "Напиток обеда"])


class LunFirstRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name="Первое обеда")


class LunMainRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name="Основное обеда")


class LunGarnishRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name="Гарнир обеда")


class DinDrinkRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name=["Напиток", "Напиток ужина"])


class DinMainRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name="Основное ужина")


class AdditionalRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name="Дополнительное")


class OrdersInChecksSerializers(serializers.ModelSerializer):
    checks_id = IntegerField(allow_null=False)
    orders_id = IntegerField(allow_null=False)

    class Meta:
        model = OrdersInChecks
        fields = "__all__"


class DishesTypeSerializers(serializers.ModelSerializer):
    dish_types_name = CharField(allow_null=False)

    class Meta:
        model = DishTypes
        fields = ("id", "dish_types_name")


class DishesSerializers(serializers.ModelSerializer):
    dishes_type = PrimaryKeyRelatedField(queryset=DishTypes.objects.all())

    class Meta:
        model = Dishes
        fields = ("id", "dishes_type", "dishes_name", "dishes_description", "dishes_calories", "dishes_price")


class BrDishesSerializers(serializers.ModelSerializer):
    br_drink = BrDrinkRelatedField(queryset=Dishes.objects.all())
    br_main = BrMainRelatedField(queryset=Dishes.objects.all())
    br_addition = AdditionalRelatedField(queryset=Dishes.objects.all())

    class Meta:
        model = BrDishes
        fields = ("id", "br_drink", "br_main", "br_addition")


class LunDishesSerializers(serializers.ModelSerializer):
    lun_drink = LunDrinkRelatedField(queryset=Dishes.objects.all())
    lun_first = LunFirstRelatedField(queryset=Dishes.objects.all())
    lun_second_garnish = LunMainRelatedField(queryset=Dishes.objects.all())
    lun_second_main = LunGarnishRelatedField(queryset=Dishes.objects.all())
    lun_addition = AdditionalRelatedField(queryset=Dishes.objects.all())

    class Meta:
        model = LunDishes
        fields = ("id", "lun_drink", "lun_first", "lun_second_garnish", "lun_second_main", "lun_addition")


class DinDishesSerializers(serializers.ModelSerializer):
    din_drink = DinDrinkRelatedField(queryset=Dishes.objects.all())
    din_main = DinMainRelatedField(queryset=Dishes.objects.all())
    din_addition = AdditionalRelatedField(queryset=Dishes.objects.all())

    class Meta:
        model = DinDishes
        fields = ("id", "din_drink", "din_main", "din_addition")


class OrdersSerializers(serializers.ModelSerializer):
    orders_breakfast_id = BrDishesSerializers()
    orders_lunch_id = LunDishesSerializers()
    orders_dinner_id = DinDishesSerializers()
    orders_price = SerializerMethodField()

    def get_orders_price(self, obj):
        breakfast_price = sum(dish.dishes_price for dish in [
            obj.orders_breakfast_id.br_drink,
            obj.orders_breakfast_id.br_main,
            obj.orders_breakfast_id.br_addition
        ] if dish)
        lunch_price = sum(dish.dishes_price for dish in [
            obj.orders_lunch_id.lun_drink,
            obj.orders_lunch_id.lun_first,
            obj.orders_lunch_id.lun_second_garnish,
            obj.orders_lunch_id.lun_second_main,
            obj.orders_lunch_id.lun_addition
        ] if dish)
        dinner_price = sum(dish.dishes_price for dish in [
            obj.orders_dinner_id.din_drink,
            obj.orders_dinner_id.din_main,
            obj.orders_dinner_id.din_addition
        ] if dish)
        return breakfast_price + lunch_price + dinner_price


    class Meta:
        model = Orders
        fields = ("id", 'orders_breakfast_id', 'orders_lunch_id', 'orders_dinner_id', 'orders_price')


class ChecksSerializers(serializers.ModelSerializer):
    orders_list = OrdersSerializers(many=True)
    checks_price = SerializerMethodField()

    def get_checks_price(self, instance):
        orders_list = instance.orders_list.all()
        total_price = 0
        for order in orders_list:
            breakfast_price = sum(dish.dishes_price for dish in [
                order.orders_breakfast_id.br_drink,
                order.orders_breakfast_id.br_main,
                order.orders_breakfast_id.br_addition
            ] if dish)
            lunch_price = sum(dish.dishes_price for dish in [
                order.orders_lunch_id.lun_drink,
                order.orders_lunch_id.lun_first,
                order.orders_lunch_id.lun_second_garnish,
                order.orders_lunch_id.lun_second_main,
                order.orders_lunch_id.lun_addition
            ] if dish)
            dinner_price = sum(dish.dishes_price for dish in [
                order.orders_dinner_id.din_drink,
                order.orders_dinner_id.din_main,
                order.orders_dinner_id.din_addition
            ] if dish)
            total_price += (breakfast_price + lunch_price + dinner_price)
        return total_price

    class Meta:
        model = Checks
        fields = ("id", "orders_list", "checks_created_dttm", "checks_price")


