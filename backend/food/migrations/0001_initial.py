# Generated by Django 3.2.16 on 2024-04-26 20:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dishes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('valid_from_dttm', models.DateTimeField(verbose_name='Дата начала нахождения блюда в меню (datatime)')),
                ('valid_to_dttm', models.DateTimeField(verbose_name='Дата конца нахождения блюда в меню (datatime)')),
            ],
            options={
                'verbose_name': 'Блюда',
            },
        ),
        migrations.CreateModel(
            name='Orders',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('children_id', models.IntegerField(verbose_name='id ребенка, на которого заказано блюдо')),
                ('orders_created_dttm', models.DateTimeField(verbose_name='Дата создания заказа (datatime)')),
                ('orders_day_dt', models.DateField(verbose_name='Дата создания заказа (data)')),
                ('orders_if_paid', models.BooleanField(verbose_name='флаг, оплачен или нет')),
                ('orders_payment_amount', models.FloatField(verbose_name='Стоимость заказа (вычислимое поля)')),
            ],
            options={
                'verbose_name': 'Orders',
            },
        ),
        migrations.CreateModel(
            name='DishesInOrders',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dish_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.dishes')),
                ('order_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.orders')),
            ],
        ),
    ]
