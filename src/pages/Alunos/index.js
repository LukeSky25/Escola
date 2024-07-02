import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { AlunosContainer, ProfilePicture, NovoAluno } from './styled';
import axios from '../../services/axios';

import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      async function getData() {
        setIsLoading(true);
        const response = await axios.get('/alunos');
        setAlunos(response.data);
        setIsLoading(false);
      }

      getData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const idStored = useSelector((state) => state.auth.user.id);

  const handleDelete = async (e, id, index) => {
    e.persist();

    try {
      if (idStored) {
        setIsLoading(true);

        await axios.delete(`/alunos/${id}`);
        const novosAlunos = [...alunos];

        novosAlunos.splice(index, 1);
        setAlunos(novosAlunos);

        setIsLoading(false);
      } else {
        toast.error('Você precisa fazer login para deletar um aluno');
      }
    } catch (e) {
      const status = get(e, 'response.status', 0);

      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocoreu umerro ao excluir o aluno');
      }

      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>

      <NovoAluno to="/aluno/">Novo Aluno</NovoAluno>

      <AlunosContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} crossOrigin=""></img>
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>
            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </AlunosContainer>
    </Container>
  );
}
