from rest_framework import serializers
from rest_framework.fields import IntegerField, CharField, DateTimeField
from food.models import Orders, Dishes, DishesInOrders


class OrdersSerializers(serializers.ModelSerializer):


    class Meta:
        model = Orders
        fields = "__all__"


class DishesSerializers(serializers.ModelSerializer):
    dish_name = CharField(min_length=5,
                          max_length=50,
                          allow_null=False)

    dish_description = CharField(min_length=0,
                                 max_length=1024,
                                 allow_null=False)

    dish_calories = IntegerField(min_value=0,
                                 max_value=1000,
                                 allow_null=False)

    dish_price = IntegerField(min_value=20,
                              max_value=350,
                              allow_null=False)

    valid_from_dttm = DateTimeField()

    valid_to_dttm = DateTimeField()

    class Meta:
        model = Dishes
        fields = ("id", "dish_type", "dish_name", "dish_description", "dish_calories", "dish_price", "valid_from_dttm", "valid_to_dttm", "SchoolWorkers_id")


class DishesInOrdersSerializers(serializers.ModelSerializer):


    class Meta:
        model = DishesInOrders
        fields = ""

