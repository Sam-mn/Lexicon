// src/hooks/useModuleForm.ts
import { useState } from 'react';
import { addModuleReq } from '../utils/requests';
import { useNavigate } from 'react-router-dom';
import { IModule, IModuleFormData } from '../utils/interfaces';

export const useModuleForm = (courseId: string) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IModule>({
    moduleName: '',
    description: '',
    startDate: '',
    endDate: '',
    courseId
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.moduleName.trim()) {
      setError('Modulnamn är obligatoriskt');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Beskrivning är obligatoriskt');
      return false;
    }
    if (!formData.startDate) {
      setError('Startdatum är obligatoriskt');
      return false;
    }
    if (!formData.endDate) {
      setError('Slutdatum är obligatoriskt');
      return false;
    }
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setError('Startdatum kan inte vara efter slutdatum');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSuccess(false);
      setLoading(true);
      setError('');
      await addModuleReq(courseId, formData);
      setSuccess(true);
      // setFormData({
      //   moduleName: '',
      //   description: '',
      //   startDate: '',
      //   endDate: '',
      //   courseId
      // });
      // setTimeout(() => navigate(`/courses/${courseId}`), 2000);
    } catch (err) {
      setError('Något gick fel vid tillägg av modul. Försök igen.');
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit,setFormData, error, success, loading };
};