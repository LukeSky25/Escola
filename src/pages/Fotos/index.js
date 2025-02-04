import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match, history }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));

        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);

        toast.error('Erro ao obter imagem');
        history.push('/home');
      }
    };

    getData();
  }, [id, history]);

  const handleChange = async (e) => {
    const file = e.target.files[0];

    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);

    const formData = new FormData();

    formData.append('aluno_id', id);
    formData.append('foto', file);

    try {
      setIsLoading(true);

      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso');

      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);

      const { status } = get(e, 'response', '');
      toast.error('Erro ao enviar foto');

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Fotos</h1>

      <Form>
        <label htmlFor="foto">
          {foto ? (
            <img src={foto} alt="Foto" crossOrigin="" />
          ) : (
            'Selecionar Foto'
          )}
          <input type="file" id="foto" onChange={handleChange}></input>
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};
