import React, { useState } from "react";
import { useRouter } from "next/router";
import { NavBar } from "@/components/global/NavBar";
import { Title } from "@/components/global/Title";
import { colors } from "@/styles/colors";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import { BiUser } from "react-icons/bi";

export default function ProfilePicture() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. Taille maximum : 5 Mo');
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Ici, vous implémenteriez l'upload vers votre backend
      alert('Dans une version future, cette photo sera uploadée');
      router.push('/personal-info');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header avec bouton retour */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => router.push('/personal-info')}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            <FiArrowLeft size={24} className="text-gray-700" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-semibold text-gray-900">Photo de profil</h1>
          </div>
          <div className="w-10" /> {/* Spacer pour centrer le titre */}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Zone de prévisualisation */}
        <div className="aspect-square w-48 mx-auto relative rounded-full overflow-hidden bg-white shadow-lg border-4 border-white">
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <BiUser size={64} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Zone de contrôles */}
        <div className="space-y-4 px-4">
          <p className="text-center text-sm text-gray-600">
            Format accepté : JPG, PNG (max 5 Mo)
          </p>
          
          <div className="space-y-3">
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileSelect}
              className="hidden"
              id="profile-picture-input"
            />
            
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white shadow-sm hover:shadow transition-all duration-300"
              onClick={() => {
                const input = document.getElementById('profile-picture-input') as HTMLInputElement;
                if (input) input.click();
              }}
            >
              <FiUpload size={20} className="text-gray-700" />
              <span className="text-gray-700 font-medium">Choisir une photo</span>
            </button>

            {selectedFile && (
              <button
                onClick={handleUpload}
                className="w-full py-3 px-4 rounded-lg text-white font-medium shadow-sm transition-all duration-300 hover:shadow"
                style={{ backgroundColor: colors.primary.main }}
              >
                Enregistrer
              </button>
            )}
          </div>
        </div>
      </div>

      <NavBar activePage="profile" />
    </div>
  );
}
