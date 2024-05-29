from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from .constants import LENGTH_NAME, LENGTH_DESCRIPTION, MIN_NUMBER, MAX_PRICE, MAX_CALORIES, MAX_MARK
from users.models import (Parents, Children)


class DishTypes(models.Model):
    dishes_types_name = models.CharField(max_length=LENGTH_NAME,
                                         verbose_name="Название типа блюда",
                                         blank=False,
                                         null=False,
                                         default="Напиток")

    class Meta:
        verbose_name = "Типа блюда"

    def __str__(self):
        return self.dishes_types_name


class Dishes(models.Model):
    dishes_type = models.ForeignKey(DishTypes,
                                    blank=False,
                                    null=False,
                                    on_delete=models.CASCADE,
                                    verbose_name="Тип блюда")

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

    #SchoolWorkers_id = models.ForeignKey(SchoolWorkers,
    #                                     null=False,
    #                                     on_delete=models.CASCADE,
    #                                     verbose_name="id работника учреждения, который выставил блюдо")

    class Meta:
        verbose_name = "Блюда"

    def __str__(self):
        return self.dishes_name


class BrDishes(models.Model):
    br_drink = models.ForeignKey(Dishes,
                                 on_delete=models.CASCADE,
                                 null=True,
                                 verbose_name="Напиток завтрака",
                                 related_name="br_drink")

    br_main = models.ForeignKey(Dishes,
                                on_delete=models.CASCADE,
                                null=True,
                                verbose_name="Основное завтрака",
                                related_name="br_main")

    br_addition = models.ForeignKey(Dishes,
                                    on_delete=models.CASCADE,
                                    null=True,
                                    verbose_name="Дополнительное",
                                    related_name="br_addition")

    class Meta:
        verbose_name = "Список блюд на завтрак"

    def __str__(self):
        return f'{self.br_drink} {self.br_main} {self.br_addition}'


class LunDishes(models.Model):
    lun_drink = models.ForeignKey(Dishes,
                                  on_delete=models.CASCADE,
                                  null=True,
                                  verbose_name="Напиток обеда",
                                  related_name="lun_drink")

    lun_first = models.ForeignKey(Dishes,
                                  on_delete=models.CASCADE,
                                  null=True,
                                  verbose_name="Первое обеда",
                                  related_name="lun_first")

    lun_second_garnish = models.ForeignKey(Dishes,
                                           on_delete=models.CASCADE,
                                           null=True,
                                           verbose_name="Гарнир обеда",
                                           related_name="lun_second_garnish")

    lun_second_main = models.ForeignKey(Dishes,
                                        on_delete=models.CASCADE,
                                        null=True,
                                        verbose_name="Основное обеда",
                                        related_name="lun_second_main")

    lun_addition = models.ForeignKey(Dishes,
                                     on_delete=models.CASCADE,
                                     null=True,
                                     verbose_name="Дополнительное",
                                     related_name="lun_addition")

    class Meta:
        verbose_name = "Список блюд на обед"

    def __str__(self):
        return f'{self.lun_drink} {self.lun_first} {self.lun_second_garnish} {self.lun_second_main} {self.lun_addition}'


class DinDishes(models.Model):
    din_drink = models.ForeignKey(Dishes,
                                  on_delete=models.CASCADE,
                                  null=True,
                                  verbose_name="Напиток ужина",
                                  related_name="din_drink")

    din_main = models.ForeignKey(Dishes,
                                 on_delete=models.CASCADE,
                                 null=True,
                                 verbose_name="Основное ужина",
                                 related_name="din_main")

    din_addition = models.ForeignKey(Dishes,
                                     on_delete=models.CASCADE,
                                     null=True,
                                     verbose_name="Дополнительное",
                                     related_name="din_addition")

    class Meta:
        verbose_name = "Список блюд на ужин"

    def __str__(self):
        return f'{self.din_drink} {self.din_main} {self.din_addition}'


class Orders(models.Model):
    orders_breakfast_id = models.ForeignKey(BrDishes,
                                            null=False,
                                            on_delete=models.CASCADE,
                                            verbose_name="id комплекта, в котором блюда для завтрака")

    orders_lunch_id = models.ForeignKey(LunDishes,
                                        null=False,
                                        on_delete=models.CASCADE,
                                        verbose_name="id комплекта, в котором блюда для обеда")

    orders_dinner_id = models.ForeignKey(DinDishes,
                                         null=False,
                                         on_delete=models.CASCADE,
                                         verbose_name="id комплекта, в котором блюда для ужина")

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

    orders_price = models.FloatField(validators=[
                                        MinValueValidator(MIN_NUMBER)
                                     ],
                                     null=False,
                                     default=0,
                                     verbose_name="Стоимость заказа (вычислимое поля)")

    class Meta:
        verbose_name = "Orders"

    def __str__(self):
        return f"{self.orders_day_dt} {self.children_id}"


class Checks(models.Model):
    orders_list = models.ManyToManyField(Orders,
                                         through="OrdersInChecks",
                                         verbose_name="Список заказов")

    checks_created_dttm = models.DateTimeField(null=False,
                                               auto_now_add=True,
                                               verbose_name="Дата создания чека (datatime)")

    checks_price = models.FloatField(validators=[
                                    MinValueValidator(MIN_NUMBER)
                                    ],
                                    null=False,
                                    default=0,
                                    verbose_name="Стоимость чека (вычислимое поля)")

    class Meta:
        verbose_name = "Checks"

    def __str__(self):
        return f"{self.orders_list}"


class OrdersInChecks(models.Model):
    orders_id = models.ForeignKey(Orders,
                                  on_delete=models.CASCADE)

    checks_id = models.ForeignKey(Checks,
                                  on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.orders_id} {self.checks_id}"


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
