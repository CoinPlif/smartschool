from django.shortcuts import render

# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.response import Response

from api import serializers
from food.models import Dishes, Orders, Checks, BrDishes, LunDishes, DinDishes, DishTypes


class DishesViewSet(viewsets.ModelViewSet):
    queryset = Dishes.objects.all()
    serializer_class = serializers.DishesSerializers

    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("dishes_type",)

class DishTypesViewSet(viewsets.ModelViewSet):
    queryset = DishTypes.objects.all()
    serializer_class = serializers.DishesTypeSerializers


class BrDishesViewSet(viewsets.ModelViewSet):
    queryset = BrDishes.objects.all()
    serializer_class = serializers.BrDishesSerializers

    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("br_child", "br_day")


class LunDishesViewSet(viewsets.ModelViewSet):
    queryset = LunDishes.objects.all()
    serializer_class = serializers.LunDishesSerializers

    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("lun_child", "lun_day")


class DinDishesViewSet(viewsets.ModelViewSet):
    queryset = DinDishes.objects.all()
    serializer_class = serializers.DinDishesSerializers

    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("din_child", "din_day")


class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = serializers.OrdersSerializers

    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("children_id", )


class ChecksViewSet(viewsets.ModelViewSet):
    queryset = Checks.objects.all()
    serializer_class = serializers.ChecksSerializers
