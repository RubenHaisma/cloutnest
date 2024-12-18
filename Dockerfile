FROM node:21

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

# Create startup script
RUN echo '#!/bin/sh\n\
echo "Running database migrations..."\n\
npx prisma migrate deploy\n\
echo "Starting application..."\n\
npm start' > /app/start.sh && chmod +x /app/start.sh

# Start the application using the startup script
CMD ["/app/start.sh"]