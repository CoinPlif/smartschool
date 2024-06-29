# Generated by Django 3.2.16 on 2024-06-29 04:22

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('food', '0006_auto_20240620_2233'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='checks',
            name='orders_list',
        ),
        migrations.AddField(
            model_name='checks',
            name='checks_children',
            field=models.IntegerField(default=1, verbose_name='Количество детей'),
        ),
        migrations.AddField(
            model_name='checks',
            name='order_list',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, null=True, size=None, verbose_name='ID заказов'),
        ),
        migrations.DeleteModel(
            name='OrdersInChecks',
        ),
    ]
