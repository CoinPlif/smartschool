from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework import serializers
from rest_framework.fields import IntegerField, CharField, DateTimeField, SerializerMethodField
from rest_framework.relations import PrimaryKeyRelatedField

from food.models import Orders, Dishes, DishesInOrders, DishTypes, OrdersInChecks, Checks


class DishesInOrdersSerializers(serializers.ModelSerializer):
    dish_id = IntegerField(allow_null=False)
    orders_id = IntegerField(allow_null=False)

    class Meta:
        model = DishesInOrders
        fields = "__all__"


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


class OrdersSerializers(serializers.ModelSerializer):
    dishes_list = DishesSerializers(many=True)
    orders_price = SerializerMethodField()

    def get_orders_price(self, instance):
        dishes_list = instance.dishes_list.all()
        total_price = sum(dish.dishes_price for dish in dishes_list)
        return total_price

    class Meta:
        model = Orders
        fields = ("id", 'dishes_list', 'children_id', 'orders_day_dt', 'orders_if_paid',  'orders_price')


class ChecksSerializers(serializers.ModelSerializer):
    orders_list = OrdersSerializers(many=True)
    checks_price = SerializerMethodField()

    def get_checks_price(self, instance):
        print(instance.orders_list.all())
        orders_list = instance.orders_list.all()
        total_price = 0
        for order in orders_list:
            print(order.orders_price)
            total_price += order.orders_price
        return total_price

    class Meta:
        model = Checks
        fields = ("id", "orders_list", "checks_created_dttm", "checks_price")

