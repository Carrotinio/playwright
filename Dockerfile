# Set docker image
FROM mcr.microsoft.com/playwright:v1.55.0-noble 

# Copy project to folder in the docker
RUN mkdir /app
WORKDIR /app
COPY . /app/

# Install PW and it's browsers
RUN npm install --force
RUN npx playwright install
