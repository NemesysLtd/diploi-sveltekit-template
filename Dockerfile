FROM nemesys/diploi-sveltekit-template:[template-tag]

# Install application code
WORKDIR /app
COPY project/. ./
RUN npm install
RUN npm run build
