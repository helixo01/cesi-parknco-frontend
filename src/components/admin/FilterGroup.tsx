import React, { useState, useEffect } from 'react';
import { FormInput } from "@/components/global/TextInput";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterGroupProps {
  typePromotion: string;
  setTypePromotion: (value: string) => void;
  specialite: string;
  setSpecialite: (value: string) => void;
  annee: string;
  setAnnee: (value: string) => void;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({
  typePromotion,
  setTypePromotion,
  specialite,
  setSpecialite,
  annee,
  setAnnee
}) => {
  // Options des filtres identiques à celles de info-perso
  const formationOptions = [
    { value: '', label: 'Tous les types' },
    { value: 'personnel', label: 'Personnel' },
    { value: 'master', label: 'Master' },
    { value: 'cpi', label: 'CPI' },
    { value: 'fise', label: 'FISE' },
    { value: 'fisa', label: 'FISA' },
  ];

  const getSpecialiteOptions = () => {
    const baseOptions = [
      { value: '', label: 'Toutes les spécialités' },
      { value: 'informatique', label: 'Informatique' },
      { value: 'btp', label: 'BTP' },
      { value: 'generaliste', label: 'Généraliste' },
    ];

    // Masquer les options de spécialité pour le personnel
    if (typePromotion === 'personnel') {
      return [{ value: '', label: 'Non applicable' }];
    }
    
    // Pour CPI 1ère année, seule l'option généraliste est disponible
    if (typePromotion === 'cpi' && annee === '1') {
      return [
        { value: '', label: 'Toutes les spécialités' },
        { value: 'generaliste', label: 'Généraliste' },
      ];
    }

    return baseOptions;
  };

  const getYearOptions = () => {
    if (typePromotion === 'personnel' || typePromotion === '') {
      return [{ value: '', label: 'Non applicable' }];
    }
    
    if (typePromotion === 'master') {
      return [
        { value: '', label: 'Toutes les années' },
        ...Array.from({ length: 2 }, (_, i) => ({
          value: String(i + 1),
          label: `${i + 1}${i === 0 ? 'ère' : 'ème'} année`,
        }))
      ];
    }
    
    if (typePromotion === 'cpi') {
      return [
        { value: '', label: 'Toutes les années' },
        ...Array.from({ length: 2 }, (_, i) => ({
          value: String(i + 1),
          label: `${i + 1}${i === 0 ? 'ère' : 'ème'} année`,
        }))
      ];
    }
    
    if (typePromotion === 'fise' || typePromotion === 'fisa') {
      return [
        { value: '', label: 'Toutes les années' },
        ...Array.from({ length: 3 }, (_, i) => ({
          value: String(i + 3),
          label: `${i + 3}ème année`,
        }))
      ];
    }
    
    return [{ value: '', label: 'Toutes les années' }];
  };

  // Mise à jour des filtres lorsque le type de promotion change
  useEffect(() => {
    if (typePromotion === 'personnel') {
      setSpecialite('');
      setAnnee('');
    } else if (typePromotion === 'cpi' && annee === '1') {
      setSpecialite('generaliste');
    }
  }, [typePromotion, annee, setSpecialite, setAnnee]);

  const specialiteOptions = getSpecialiteOptions();
  const anneeOptions = getYearOptions();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <FormInput
        label="Type de formation"
        type="select"
        value={typePromotion}
        onChange={setTypePromotion}
        options={formationOptions}
        variant="light"
      />
      
      <FormInput
        label="Spécialité"
        type="select"
        value={specialite}
        onChange={setSpecialite}
        options={specialiteOptions}
        disabled={typePromotion === 'personnel'}
        variant="light"
      />
      
      <FormInput
        label="Année d'étude"
        type="select"
        value={annee}
        onChange={setAnnee}
        options={anneeOptions}
        disabled={typePromotion === 'personnel'}
        variant="light"
      />
    </div>
  );
}; 