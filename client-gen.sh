openapi-generator-cli generate \
-i http://localhost:3000/api-json \
--generator-name typescript-fetch \
--package-name apiClient \
--output client/api-client \
--additional-properties=useSingleRequestParameter=true \
--skip-validate-spec