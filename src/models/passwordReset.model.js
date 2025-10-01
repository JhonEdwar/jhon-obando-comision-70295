import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({
  email: { type: String, required: true, unique:true },
  resetToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' }
});

// Index para eliminar documentos después de 1 hora
passwordResetSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

export default mongoose.model('PasswordReset',passwordResetSchema)