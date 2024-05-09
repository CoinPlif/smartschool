# Generated by Django 3.2.16 on 2024-05-08 18:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('food', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reports',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reports_description', models.TextField(max_length=255, verbose_name='id заказа, к которому проиведен платеж')),
                ('reports_created_dttm', models.DateTimeField(verbose_name='Дата создания репорта (datatime)')),
                ('administrators_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.administrators', verbose_name='id администратора, который посмотрел репорт')),
                ('parents_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.parents', verbose_name='id родителя, который оплачивал')),
            ],
            options={
                'verbose_name': 'Репорты',
            },
        ),
        migrations.CreateModel(
            name='Payments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cards_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.cards', verbose_name='id карты, по которой проводилась оплата')),
                ('order_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='food.orders', verbose_name='id заказа, к которому проиведен платеж')),
                ('parents_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.parents', verbose_name='id родителя, который оплачивал')),
            ],
            options={
                'verbose_name': 'Платежи',
            },
        ),
    ]
