import { Camera } from "../../models/index.js";

const updateCoordinatesCamera = async (cameraId, newCoordinates) => {
  const camera = await Camera.findByPk(cameraId);

  if (!camera) {
    return false;
  }

  camera.coordinates = newCoordinates;
  await camera.save();
  return true;
};

const getCameraLocation = async (cameraId) => {
  const camera = await Camera.findByPk(cameraId);
  return camera.location;
};

export { updateCoordinatesCamera, getCameraLocation };
