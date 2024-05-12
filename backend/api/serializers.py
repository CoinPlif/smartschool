from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework import serializers
from rest_framework.fields import IntegerField, CharField, DateTimeField, SerializerMethodField
from food.models import Orders, Dishes, DishesInOrders


class DishesInOrdersSerializers(serializers.ModelSerializer):
    dish_id = IntegerField(write_only=True,
                           allow_null=False)

    orders_id = IntegerField(write_only=True,
                             allow_null=False)

    class Meta:
        model = DishesInOrders
        fields = "__all__"


class OrdersSerializers(serializers.ModelSerializer):

    orders_dishes = SerializerMethodField()

    class Meta:
        model = Orders
        fields = "__all__"

    def get_orders_dishes(self, request):
        print()
        print()
        print()
        print()
        print(request)
        print(request.dishesinorders_set.values)
        print()
        print()
        print()
        print()
        orders_dishes = request.dishesinorders_set.values(
            "dish_id",
            "order_id"
        )
        forms_dishes = []
        for orders_dish in orders_dishes:
            form_dishes = {'id': orders_dish['dish_id'],
                           'order_id': orders_dish['order_id'],
                           }
            forms_dishes.append(form_dishes)

        return forms_dishes

    # def get_orders_payment_amount(self, order):
    #     orders_dishes = order.dishesinorders_set.values(
    #         'dishes__id',
    #         'dishes__type',
    #         'dishes__name',
    #         'dishes__description',
    #         'dishes__calories',
    #         'dishes__price',
    #         'valid__from__dttm',
    #         'valid__to__dttm',
    #         'amount'
    #     )
    #     final_amount = 0
    #     for orders_dish in orders_dishes:
    #         final_amount += orders_dish['amount']*orders_dish['dishes__price']
    #
    #     return final_amount


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



