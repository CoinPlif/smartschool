from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from .constants import LENGTH_NAME, LENGTH_DESCRIPTION, MIN_NUMBER, MAX_PRICE, MAX_CALORIES, MAX_MARK
from users.models import (SchoolWorkers, Parents, Children)


class DishTypes(models.Model):
    dishes_types_name = models.CharField(max_length=LENGTH_NAME,
                                         verbose_name="Прием пищи",
                                         blank=False,
                                         null=False,
                                         default="Завтрак")

    class Meta:
        verbose_name = "Тип блюда, когда он принимается (завтрак, обед или ужин)"

    def __str__(self):
        return self.dishes_types_name


class Dishes(models.Model):
    dishes_type = models.ForeignKey(DishTypes,
                                    blank=False,
                                    null=False,
                                    on_delete=models.CASCADE,
                                    verbose_name="Тип блюда (завтрак, обед или ужин)")

    dishes_name = models.CharField(max_length=LENGTH_NAME,
                                   blank=False,
                                   null=False,
                                   verbose_name="Название блюда")

    dishes_description = models.TextField(max_length=LENGTH_DESCRIPTION,
                                          verbose_name="Описание блюда")

    dishes_calories = models.FloatField(validators=[
                                           MinValueValidator(MIN_NUMBER),
                                           MaxValueValidator(MAX_CALORIES)
                                      ],
                                      default=0,
                                      verbose_name="Калорийность блюда")

    dishes_price = models.FloatField(validators=[
                                           MinValueValidator(MIN_NUMBER),
                                           MaxValueValidator(MAX_PRICE)
                                   ],
                                   default=100,
                                   null=False,
                                   verbose_name="Цена блюда")

    valid_from_dttm = models.DateTimeField(null=False,
                                           auto_now_add=True,
                                           verbose_name="Дата начала нахождения блюда в меню (datatime)")

    valid_to_dttm = models.DateTimeField(null=False,
                                         verbose_name="Дата конца нахождения блюда в меню (datatime)")

    SchoolWorkers_id = models.ForeignKey(SchoolWorkers,
                                         null=False,
                                         on_delete=models.CASCADE,
                                         verbose_name="id работника учреждения, который выставил блюдо")

    class Meta:
        verbose_name = "Блюда"

    def __str__(self):
        return self.dishes_name


class Orders(models.Model):
    orders_dishes = models.ManyToManyField(Dishes,
                                           through="DishesInOrders",
                                           verbose_name="Список блюд")

    children_id = models.ForeignKey(Children,
                                    null=False,
                                    on_delete=models.CASCADE,
                                    verbose_name="id ребенка, на которого заказано блюдо")

    orders_created_dttm = models.DateTimeField(null=False,
                                               auto_now_add=True,
                                               verbose_name="Дата создания заказа (datatime)")

    orders_day_dt = models.DateField(null=False,
                                     verbose_name="Дата, на которую создан заказ")

    orders_if_paid = models.BooleanField(null=False,
                                         default=False,
                                         verbose_name="Флаг, оплачен или нет")

    orders_payment_amount = models.FloatField(validators=[
                                                    MinValueValidator(MIN_NUMBER)
                                              ],
                                              null=False,
                                              default=200,
                                              verbose_name="Стоимость заказа (вычислимое поля)")

    class Meta:
        verbose_name = "Orders"

    def __str__(self):
        return f"{self.orders_day_dt} {self.children_id}"


class DishesInOrders(models.Model):
    dishes_id = models.ForeignKey(Dishes,
                                  on_delete=models.CASCADE)

    orders_id = models.ForeignKey(Orders,
                                  on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.dishes_id} {self.orders_id}"


class Reviews(models.Model):
    reviews_mark = models.IntegerField(validators=[
                                           MinValueValidator(MIN_NUMBER),
                                           MaxValueValidator(MAX_MARK)
                                       ],
                                       verbose_name="Оценка отзыва",
                                       null=False,
                                       default=5)

    reviews_text = models.TextField(max_length=LENGTH_DESCRIPTION,
                                    verbose_name="Текст отзыва")

    parent_id = models.ForeignKey(Parents,
                                  on_delete=models.CASCADE,
                                  verbose_name="Оценка отзыва")

    dishes_id = models.ForeignKey(Dishes,
                                  on_delete=models.CASCADE,
                                  verbose_name="id блюда")

    reviews_created_dttm = models.DateTimeField(auto_now_add=True,
                                                verbose_name="Дата создания отзыва")

    class Meta:
        verbose_name = "Reviews"

    def __str__(self):
        return f"{self.parent_id} {self.dishes_id}"
