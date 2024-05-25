from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from users.models import SchoolWorkers, Parents
from users import serializers


class SchoolWorkersViewSet(viewsets.ModelViewSet):
    queryset = SchoolWorkers.objects.all()
    serializer_class = serializers.SchoolWorkersSerializers
    http_method_names = ['get']


class ParentsViewSet(viewsets.ModelViewSet):
    queryset = Parents.objects.all()
    serializer_class = serializers.ParentsSerializers
    http_method_names = ['get']
