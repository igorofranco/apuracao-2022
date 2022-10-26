import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Candidato, TseResponse } from '../types/tse-response';
import style from '../styles/Home.module.scss';

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
    }, 60000);
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
      <main>
        {[lula, bozo].map(c => {
          return (
            <section key={`candidato-${c.n}`}>
              <h2>
                {c.nm.match(/bolsonaro|lula/i) || c.nm}
              </h2>
              <div>
                {c.pvap}
                %
              </div>
            </section>
          );
        })}
      </main>
      <footer>
        <div title={`${data?.st} / ${data?.s} seções totalizadas`}>
          {`${data?.pst || '0,00'}% das seções totalizadas`}
        </div>
        <div>
          {'Última atualização: '}
          {data?.hg || '??:??:??'}
        </div>
      </footer>
    </main>
  );
};
