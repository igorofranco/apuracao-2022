import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Candidato, TseResponse } from '../types/tse-response';
import style from '../styles/Home.module.scss';
import Head from 'next/head';

export default function Home () {
  const [data, setData] = useState<TseResponse>();
  const [lula, setLula] = useState<Candidato>({
    seq: '1',
    sqcand: '280001607829',
    n: '13',
    nm: 'LULA',
    cc: 'PT - Federação Brasil da Esperança - FE BRASIL (PT/PC do B/PV) / SOLIDARIEDADE / Federação PSOL REDE (PSOL/REDE) / PSB / AGIR / AVANTE / PROS',
    nv: 'GERALDO ALCKMIN',
    e: 'n',
    st: '',
    dvt: 'Válido',
    vap: '0',
    pvap: '00,00'
  });
  const [bozo, setBozo] = useState<Candidato>({
    seq: '2',
    sqcand: '280001618036',
    n: '22',
    nm: 'JAIR BOLSONARO',
    cc: 'PL - PP / REPUBLICANOS / PL',
    nv: 'BRAGA NETTO',
    e: 'n',
    st: '',
    dvt: 'Válido',
    vap: '0',
    pvap: '00,00'
  });

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 15000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function fetchData () {
    axios.get('https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json')
      .then(res => {
        const data:TseResponse = res.data;
        setData(data);
        setLula(data.cand.find(cand => +cand.n === 13) as Candidato);
        setBozo(data.cand.find(cand => +cand.n === 22) as Candidato);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <main className={style.root}>
      <Head>
        <title>
          Eleições 2022 - Segundo Turno
        </title>
        <meta charSet='utf-8' />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@IgorSPN" />
        <meta name="twitter:creator" content="@IgorSPN" />
        <meta property="og:url" content="https://segundoturno2022.tk/" />
        <meta property="og:title" content="Eleições 2022 - Segundo Turno" />
        <meta property="title" content="Eleições 2022 - Segundo Turno" />
        <meta property="og:description" content="Acompanhe a apuração das eleições de 2022 como se fosse um placar." />
        <meta property="description" content="Acompanhe a apuração das eleições de 2022 como se fosse um placar." />
        <meta property="og:site_name" content="Eleições 2022 - Segundo Turno"/>
        <meta property="og:image" itemProp="image" content="https://segundoturno2022.tk/cover.jpg" />
        <meta property="og:type" content="website" />
      </Head>
      <main>
        {[lula, bozo].map(c => {
          const percentage = +c.pvap.replace(',', '.');
          return (
            <section
              key={`candidato-${c.n}`}
              style={{
                backgroundColor: +c.n === 13 ? '#660a0a' : '#0a1e66',
                width: percentage ? `${percentage}%` : '50%'
              }}
            >
              <header>
                <img
                  src={`${c.nm.match(/lula|bolsonaro/i)}.${+c.n === 13 ? 'jpeg' : 'webp'}`}
                  alt={`avatar-${c.nm.match(/lula|bolsonaro/i)}`}
                  title={`${c.vap || 0} votos apurados`}
                  style={{
                    boxShadow: c.e.match(/s/gi) ? '0 0 1rem 1rem rgb(0 255 0 / .5)' : 'unset'
                  }}
                />
              </header>
              <main>
                {`${c.pvap} %`}
              </main>
            </section>
          );
        })}
      </main>
      <footer>
        <main>
          <div title={`${data?.st} / ${data?.s} seções totalizadas`}>
            <strong>
              {`${data?.pst || '?,??'}%`}
            </strong>
            {' das seções totalizadas'}
          </div>
          <div>
            {'Última atualização: '}
            <strong>
              {data?.hg || '??:??:??'}
            </strong>
          </div>
        </main>
      </footer>
    </main>
  );
};
