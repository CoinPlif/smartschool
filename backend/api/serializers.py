from rest_framework import serializers

from food.models import Orders, Dishes, DishesInOrders


class OrdersSerializers(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = "__all__"


class DishesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Dishes
        fields = "__all__"


class DishesInOrdersSerializers(serializers.ModelSerializer):
    class Meta:
        model = DishesInOrders
        fields = "__all__"

