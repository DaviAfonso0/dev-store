import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import { Star } from "@mui/icons-material";

export function estrelasNota(nota) {
  const estrelas = [];

  const estrelasInteiras = Math.floor(nota);
  const parteDecimal = nota % 1;

  let quantidadeCheias = estrelasInteiras;
  let temMeiaEstrela = false;

  if (parteDecimal >= 0.25 && parteDecimal < 0.75) {
    temMeiaEstrela = true;
  } else if (parteDecimal >= 0.75) {
    quantidadeCheias++;
  }

  for (let i = 0; i < quantidadeCheias; i++) {
    estrelas.push(<Star sx={{ fontSize: 20 }} key={`cheia-${i}`} />);
  }

  if (temMeiaEstrela) {
    estrelas.push(<StarHalfIcon sx={{ fontSize: 20 }} key="meia" />);
  }

  while (estrelas.length < 5) {
    estrelas.push(
      <StarPurple500Icon sx={{ fontSize: 20 }} key={`vazia-${estrelas.length}`} />
    );
  }

  return <div className="text-cobre">{estrelas}</div>;
}