from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework import serializers
from rest_framework.fields import IntegerField, CharField, DateTimeField, SerializerMethodField
from rest_framework.relations import PrimaryKeyRelatedField

from food.models import Orders, Dishes, BrDishes, LunDishes, DinDishes, DishTypes, OrdersInChecks, Checks


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
    class Meta:
        model = BrDishes
        fields = ("id", "br_drink", "br_main", "br_addition")


class LunDishesSerializers(serializers.ModelSerializer):
    class Meta:
        model = LunDishes
        fields = ("id", "lun_drink", "lun_first", "lun_second_garnish", "lun_second_main", "lun_addition")


class DinDishesSerializers(serializers.ModelSerializer):
    class Meta:
        model = DinDishes
        fields = ("id", "din_drink", "din_main", "din_addition")


class OrdersSerializers(serializers.ModelSerializer):
    orders_breakfast_id = PrimaryKeyRelatedField(queryset=BrDishes.objects.all())
    orders_lunch_id = PrimaryKeyRelatedField(queryset=LunDishes.objects.all())
    orders_dinner_id = PrimaryKeyRelatedField(queryset=DinDishes.objects.all())
    orders_price = SerializerMethodField()

    def get_orders_price(self, instance):
        dishes_list = instance.dishes_list.all()
        total_price = sum(dish.dishes_price for dish in dishes_list)
        return total_price

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
            print(order)
            dish_list = order.dishes_list.all()
            for dish in dish_list:
                total_price += dish.dishes_price
        return total_price

    class Meta:
        model = Checks
        fields = ("id", "orders_list", "checks_created_dttm", "checks_price")


