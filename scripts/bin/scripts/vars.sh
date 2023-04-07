IRIS_DIR="$(dirname $SCRIPT_ROOT_DIR)"
PROJECT_ROOT_DIR="$(dirname $IRIS_DIR)"
DOCKER_DIR="$IRIS_DIR/docker"

declare -A PROJECT_PATH_FILES
declare -A PROJECT_DOCKER_PATH_FILES
declare -A PROJECT_CONTAINER_TO_UP_NAMES

PROJECT_PATH_FILES=(  
  ["backend"]="$PROJECT_ROOT_DIR/backend"  
  ["frontend"]="$PROJECT_ROOT_DIR/frontend"  
)

PROJECT_DOCKER_PATH_FILES=(
  ["backend"]="$DOCKER_DIR/backend/docker-compose.yml"
  ["frontend"]="$DOCKER_DIR/frontend/docker-compose.yml"  
)

PROJECT_CONTAINER_TO_UP_NAMES=(
  ["backend"]="backend"
  ["frontend"]="frontend"
)
