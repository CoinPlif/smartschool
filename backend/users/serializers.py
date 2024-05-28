from rest_framework import serializers

from users.models import SchoolWorkers, Parents
from rest_framework.fields import (SerializerMethodField, IntegerField, ImageField, ReadOnlyField, CharField)


class SchoolWorkersSerializers(serializers.ModelSerializer):
    class Meta:
        model = SchoolWorkers
        fields = ('id', 'schoolworkers_login', 'schoolworkers_password')


class ParentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Parents
        fields = ('id', 'parents_login', 'parents_password', 'parents_name', 'card_id')
