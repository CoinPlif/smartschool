from django.core.validators import MinValueValidator, MaxValueValidator
from rest_framework import serializers
from rest_framework.fields import IntegerField, CharField, DateTimeField, SerializerMethodField
from food.models import Orders, Dishes, DishesInOrders


class OrdersSerializers(serializers.ModelSerializer):

    orders_dishes = SerializerMethodField()
    orders_payment_amount = SerializerMethodField()

    class Meta:
        model = Orders
        fields = ('id', 'orders_dishes', 'children_id', 'orders_created_dttm', 'orders_day_dt', 'orders_payment_amount')

    def get_orders_dishes(self, order):
        print()
        print()
        print()
        print()

        print(order)
        print(order.dishesinorders_set)
        print(order.dishesinorders_set.values)
        print()
        print()
        print()
        print()
        orders_dishes = order.dishesinorders_set.values(
            'dishes__id',
            'dishes__type',
            'dishes__name',
            'dishes__description',
            'dishes__calories',
            'dishes__price',
            'valid__from__dttm',
            'valid__to__dttm',
            'amount'
        )
        form_dishes = []
        for orders_dish in orders_dishes:
            form_dishes = {'id': orders_dish['dish__is'],
                           'type': orders_dish['dishes__type'],
                           'name': orders_dish['dishes__name'],
                           'description': orders_dish['dishes__description'],
                           'calories': orders_dish['dishes__calories'],
                           'price': orders_dish['dishes__price'],
                           'valid_from_dttm': orders_dish['valid_to__dttm'],
                           'valid_to_dttm': orders_dish['valid_to__dttm']}
            form_dishes.append(form_dishes)

        return form_dishes

    def get_orders_payment_amount(self, order):
        orders_dishes = order.dishesinorders_set.values(
            'dishes__id',
            'dishes__type',
            'dishes__name',
            'dishes__description',
            'dishes__calories',
            'dishes__price',
            'valid__from__dttm',
            'valid__to__dttm',
            'amount'
        )
        final_amount = 0
        for orders_dish in orders_dishes:
            final_amount += orders_dish['amount']*orders_dish['dishes__price']

        return final_amount


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
    id = IntegerField(write_only=True,
                      allow_null=False)

    amount = IntegerField(default=0,
                          allow_null=False,
                          validators=[MinValueValidator(0),
                                      MaxValueValidator(5)])

    class Meta:
        model = DishesInOrders
        fields = "__all__"

