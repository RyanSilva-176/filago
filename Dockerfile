FROM php:8.1-apache

# Instala a extensão mysqli necessária para o banco de dados
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Habilita o mod_rewrite do Apache (comum em projetos PHP)
RUN a2enmod rewrite

# Copia os arquivos do projeto para o diretório padrão do Apache
COPY . /var/www/html/

# Define as permissões corretas para o Apache
RUN chown -R www-data:www-data /var/www/html/

# Expõe a porta 80
EXPOSE 80
