from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework import serializers
from rest_framework.fields import IntegerField, CharField, DateTimeField, SerializerMethodField
from rest_framework.relations import PrimaryKeyRelatedField
import json
from food.models import Orders, Dishes, BrDishes, LunDishes, DinDishes, DishTypes, Checks


class BrDrinkRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name__in=["Напиток", "Напиток завтрака"])


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
        return queryset.filter(dishes_type__dishes_types_name__in=["Напиток", "Напиток обеда"])


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
        return queryset.filter(dishes_type__dishes_types_name__in=["Напиток", "Напиток ужина"])


class DinMainRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name="Основное ужина")
    
class DinGarnishRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name="Гарнир ужина")


class AdditionalRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        if not request:
            return queryset
        return queryset.filter(dishes_type__dishes_types_name="Дополнительное")



class DishesTypeSerializers(serializers.ModelSerializer):
    class Meta:
        model = DishTypes
        fields = "__all__"


class DishesSerializers(serializers.ModelSerializer):
    dishes_type = PrimaryKeyRelatedField(queryset=DishTypes.objects.all())

    class Meta:
        model = Dishes
        fields = ("id", "dishes_type", "dishes_name", "dishes_description", "dishes_calories", "dishes_price", "valid_from_dttm", "valid_to_dttm")


class BrDishesSerializers(serializers.ModelSerializer):
    br_drink = BrDrinkRelatedField(queryset=Dishes.objects.all(), required=False, allow_null=True)
    br_main = BrMainRelatedField(queryset=Dishes.objects.all(), required=False, allow_null=True)
    br_addition = AdditionalRelatedField(queryset=Dishes.objects.all(), required=False, allow_null=True)

    class Meta:
        model = BrDishes
        fields = ("id", "br_drink", "br_main", "br_addition", "br_day", "br_child")


class LunDishesSerializers(serializers.ModelSerializer):
    lun_drink = LunDrinkRelatedField(queryset=Dishes.objects.all(), required=False, allow_null=True)
    lun_first = LunFirstRelatedField(queryset=Dishes.objects.all(), required=False, allow_null=True)
    lun_second_garnish = LunMainRelatedField(queryset=Dishes.objects.all(), required=False, allow_null=True)
    lun_second_main = LunGarnishRelatedField(queryset=Dishes.objects.all(), required=False, allow_null=True)
    lun_addition = AdditionalRelatedField(queryset=Dishes.objects.all(), required=False, allow_null=True)

    class Meta:
        model = LunDishes
        fields = ("id", "lun_drink", "lun_first", "lun_second_garnish", "lun_second_main", "lun_addition", "lun_day", "lun_child")


class DinDishesSerializers(serializers.ModelSerializer):
    din_drink = DinDrinkRelatedField(queryset=Dishes.objects.all(), required=False, allow_null=True)
    din_main = DinMainRelatedField(queryset=Dishes.objects.all(), required=False, allow_null=True)
    din_garnish = DinGarnishRelatedField(queryset=Dishes.objects.all(), required=False, allow_null=True)
    din_addition = AdditionalRelatedField(queryset=Dishes.objects.all(), required=False, allow_null=True)

    class Meta:
        model = DinDishes
        fields = ("id", "din_drink", "din_main", "din_garnish", "din_addition", "din_day", "din_child")


class BrDishesRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        return queryset


class LunDishesRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        return queryset


class DinDishesRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super().get_queryset()
        return queryset


class OrdersSerializers(serializers.ModelSerializer):
    orders_breakfast_id = BrDishesRelatedField(queryset=BrDishes.objects.all(), required=False, allow_null=True)
    orders_lunch_id = LunDishesRelatedField(queryset=LunDishes.objects.all(), required=False, allow_null=True)
    orders_dinner_id = DinDishesRelatedField(queryset=DinDishes.objects.all(), required=False, allow_null=True)

    class Meta:
        model = Orders
        fields = ("id", 'orders_breakfast_id', 'orders_lunch_id', 'orders_dinner_id', 'orders_price', "children_id", "orders_day_dt", "orders_price", "orders_if_paid")


class ChecksSerializers(serializers.ModelSerializer):
    orders_list = serializers.ListField(child=serializers.IntegerField(), write_only=True)

    class Meta:
        model = Checks
        fields = ['orders_list', 'checks_price', 'checks_children', 'orders_list_str']

    def create(self, validated_data):
        orders_list = validated_data.pop('orders_list')
        validated_data['orders_list_str'] = json.dumps(orders_list)
        return super().create(validated_data)