from rest_framework import serializers

from users.models import SchoolWorkers, Parents
from rest_framework.fields import (SerializerMethodField, IntegerField, ImageField, ReadOnlyField, CharField)


class SchoolWorkersSerializers(serializers.ModelSerializer):
    id = IntegerField(write_only=True)

    schoolworkers_login = CharField(min_length=8,
                                    max_length=32,
                                    allow_null=False,
                                    trim_whitespace=True,
                                    required=True)

    schoolworkers_password = CharField(min_length=8,
                                       max_length=32,
                                       allow_null=False,
                                       trim_whitespace=True,
                                       required=True)

    class Meta:
        model = SchoolWorkers
        fields = ('id', 'schoolworkers_login', 'schoolworkers_password', 'administrators_id')


class ParentsSerializers(serializers.ModelSerializer):
    id = IntegerField(write_only=True)

    parents_login = CharField(min_length=8,
                              max_length=32,
                              allow_null=False,
                              trim_whitespace=True,
                              required=True)

    parents_password = CharField(min_length=8,
                                 max_length=32,
                                 allow_null=False,
                                 trim_whitespace=True,
                                 required=True)

    parents_name = CharField(min_length=2,
                             max_length=32,
                             allow_null=False,
                             trim_whitespace=True,
                             required=True)

    class Meta:
        model = Parents
        fields = ('parents_login', 'parents_password', 'parents_name', 'card_id', 'administrators_id')
