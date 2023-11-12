import Camera from "../../models/camera.js";

const updateCoordinatesCamera = async (cameraId, newCoordinates) => {
  const camera = await Camera.findByPk(cameraId);

  if (!camera) {
    return false;
  }

  camera.coordinates = newCoordinates;
  await camera.save();
  return true;
};

export { updateCoordinatesCamera };
