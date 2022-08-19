FROM php:8-fpm  
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip 
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN apt-get update && apt-get upgrade -y
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
ENV COMPOSER_ALLOW_SUPERUSER=1
CMD ["bash","-c","composer update && composer install && php-fpm"]