FROM node:22.3.0
WORKDIR /app/field-level-encryption-mongodb
COPY package*.json ./

RUN apt-get update && \
    apt-get install -y \
    curl \
    tar \
    gcc \
    make \
    cmake \
    libssl-dev \
    sudo \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/mongodb/libmongocrypt \
    && cd libmongocrypt \
    && mkdir cmake-build && cd cmake-build \
    && cmake ../ \
    && make

#----ubuntu-----
# RUN sudo sh -c 'curl -s --location https://pgp.mongodb.com/libmongocrypt.asc | gpg --dearmor >/etc/apt/trusted.gpg.d/libmongocrypt.gpg'
# RUN echo "deb https://libmongocrypt.s3.amazonaws.com/apt/ubuntu jammy/libmongocrypt/1.8 universe" | sudo tee /etc/apt/sources.list.d/libmongocrypt.list
# RUN sudo apt-get update
# RUN sudo apt-get install -y libmongocrypt-dev

#----debian-----
# RUN sudo sh -c 'curl -s --location https://pgp.mongodb.com/libmongocrypt.asc | gpg --dearmor >/etc/apt/trusted.gpg.d/libmongocrypt.gpg'
# RUN echo "deb https://libmongocrypt.s3.amazonaws.com/apt/debian <release>/libmongocrypt/1.8 main" | sudo tee /etc/apt/sources.list.d/libmongocrypt.list
# RUN sudo apt-get update
# RUN sudo apt-get install -y libmongocrypt-dev

RUN npm install
COPY . .

# RUN curl -o /app/field-level-encryption-mongodb/mongo_crypt_v1.so https://s3.ap-southeast-1.amazonaws.com/cdn.xyz.com/mongo_file/mongo_crypt_v1.so
# RUN mv /app/field-level-encryption-mongodb/mongo_crypt_v1.so /app/field-level-encryption-mongodb/src/utils/db/

# Make the downloaded file executable if needed (optional)
# RUN chmod +x /app/field-level-encryption-mongodb/mongo_crypt_v1.so

EXPOSE 3000
CMD ["npm", "run", "dev"]