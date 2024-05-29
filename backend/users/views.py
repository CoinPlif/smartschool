from django.shortcuts import render

# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from users.models import SchoolWorkers, Parents, Children
from users import serializers


class SchoolWorkersViewSet(viewsets.ModelViewSet):
    queryset = SchoolWorkers.objects.all()
    serializer_class = serializers.SchoolWorkersSerializers
    http_method_names = ['get']


class ParentsViewSet(viewsets.ModelViewSet):
    queryset = Parents.objects.all()
    serializer_class = serializers.ParentsSerializers


class ChildrenViewSet(viewsets.ModelViewSet):
    queryset = Children.objects.all()
    serializer_class = serializers.ChildrenSerializers

    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ("parents_id",)

