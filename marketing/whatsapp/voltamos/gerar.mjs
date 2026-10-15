/**
 * IMAGEM PARA WHATSAPP · "Caímos. Voltamos."
 * ----------------------------------------------------------------------------
 * Aviso de que o perfil do Instagram foi derrubado e que um @ novo vem em breve.
 * Sem acusar ninguém. Aponta para o site, que não cai.
 * 4:5 como um post de feed; exporta 1280 × 1600 (limite do WhatsApp) e o PNG original.
 *
 * Rodar na raiz: node marketing/whatsapp/voltamos/gerar.mjs
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { COR, fio, grao, losango, medalhao, pincelada, renderizar } from '../../ferramentas/marca.mjs';
import * as A from '../../ferramentas/assets.mjs';
import { cantoneiras, fundoEscuro, rotulo } from '../../ferramentas/templates.mjs';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const W = 1080;
const H = 1350;

const html = `
<div style="position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${COR.noite}">
  ${fundoEscuro({ tom: 'noite', textura: 'raios', semente: 127, luzY: 0.28, folhas: false })}
  ${cantoneiras({ cor: COR.ouro, t: 90, inset: 40 })}

  <div class="abs" style="left:0;right:0;top:92px;display:flex;justify-content:center">${rotulo('Gestão Dr. Vital Brazil · CA Medicina FAPI')}</div>
  <div class="abs pf" style="left:0;right:0;top:150px;text-align:center;font-weight:800;font-size:150px;line-height:.9;letter-spacing:-.035em;color:${COR.papel};text-transform:uppercase">Caímos.<br/><span style="color:${COR.ouroClaro};font-style:italic">Voltamos.</span></div>
  <div class="abs" style="left:0;right:0;top:436px;display:flex;justify-content:center">${pincelada({ w: 520, h: 30 })}</div>

  <div class="abs cg" style="left:110px;right:110px;top:500px;text-align:center;font-weight:600;font-size:40px;line-height:1.18;color:${COR.papel}">Nosso perfil no Instagram foi derrubado sem explicação, um dia depois de nascer. Não sabemos quem pediu. Imaginamos por quê.</div>
  <div class="abs in" style="left:110px;right:110px;top:690px;text-align:center;font-size:27px;line-height:1.45;color:${COR.salvia}">A chapa segue de pé: <span style="color:${COR.papel}">23 estudantes, 5 eixos, 52 propostas.</span></div>

  <!-- cartão: em breve um @ novo; até lá, o site -->
  <div class="abs" style="left:110px;right:110px;top:800px;background:${COR.papel};padding:40px 48px 44px;box-shadow:0 50px 90px -40px rgba(0,0,0,.85)">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div class="eyebrow" style="font-size:17px;color:${COR.ouroEscuro}">Em breve · um @ novo no Instagram</div>
      <div style="width:56px;height:56px;border-radius:50%;border:1px solid rgba(122,92,48,.5);display:grid;place-items:center">${medalhao({ cor: COR.verde, w: 46 })}</div>
    </div>
    <div class="cg" style="font-weight:600;font-size:36px;line-height:1.15;color:${COR.tinta2};margin-top:22px">Até lá, tudo continua no site, que não cai:</div>
    <div class="pf" style="font-weight:800;font-size:58px;line-height:1;letter-spacing:-.02em;color:${COR.verde};margin-top:14px">chapavitalbrazil.com.br</div>
    <div class="in" style="font-size:22px;line-height:1.4;color:${COR.tinta2};margin-top:16px">Programa inteiro, diretoria, as cartas e como votar. Guarda o link e manda pra turma.</div>
  </div>

  <div class="abs" style="left:150px;top:1148px;width:250px;height:185px">${A.serpenteMuda({ w: 250, deslocX: -18, deslocY: -16, traco: 2 })}</div>
  <div class="abs" style="left:400px;right:110px;top:1150px;display:flex;flex-direction:column;align-items:flex-end;text-align:right">
    ${fio({ w: 70 })}
    <div class="cg" style="font-weight:600;font-size:34px;line-height:1.1;color:${COR.ouroClaro};margin-top:18px">Trocamos de pele. Não de ideia.</div>
    <div class="eyebrow" style="font-size:15px;color:${COR.salvia};margin-top:14px">Mais que uma gestão, um compromisso com a nossa formação.</div>
  </div>
  ${grao(0.08)}
</div>`;

const saida = path.join(AQUI, 'caimos-voltamos.png');
await renderizar({ html, w: W, h: H, saida });
execFileSync('python3', ['-c', `
from PIL import Image
im = Image.open(${JSON.stringify(saida)}).convert('RGB')
im.resize((1280, 1600), Image.LANCZOS).save(${JSON.stringify(path.join(AQUI, 'caimos-voltamos-whatsapp.jpg'))}, quality=92, subsampling=0, optimize=True, progressive=True)
`]);
console.log('ok', AQUI);
