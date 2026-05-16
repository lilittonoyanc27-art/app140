export interface MatchingPair {
  id: string;
  original: string;
  translation: string;
}

export interface SentenceChallenge {
  id: string;
  sentence: string; 
  answer: string;
  positive: string;
  translation: string;
  options: string[];
}

export interface DictionaryItem {
  phrase: string;
  category: 'positivo' | 'negativo';
  translation: string;
}

export interface Level {
  id: string;
  title: string;
  description: string;
  type: 'matching' | 'test' | 'championship';
  status: 'locked' | 'available' | 'completed';
}

export const CHAMPIONSHIP_DATA = {
  levels: [
    { id: '1', title: 'Մոդայիկ Մեթչինգ', description: 'Համապատասխանեցրու բուտիկի բառերը', type: 'matching', status: 'available' },
    { id: '2', title: 'Գնումների Փուլ', description: 'Դարձրու հաստատականը ժխտական', type: 'test', status: 'available' },
    { id: '3', title: 'Գայանեի Ֆեշն Շոու', description: 'Ստացիր Մոդայի Չեմպիոնի տիտղոսը', type: 'championship', status: 'available' },
  ] as Level[],
  
  dictionary: [
    { phrase: 'Algo de ropa', category: 'positivo', translation: 'Ինչ-որ հագուստ' },
    { phrase: 'Nada de rebajas', category: 'negativo', translation: 'Ոչ մի զեղչ' },
    { phrase: 'Alguien compra', category: 'positivo', translation: 'Ինչ-որ մեկը գնում է' },
    { phrase: 'Nadie entra', category: 'negativo', translation: 'Ոչ ոք չի մտնում' },
    { phrase: 'Siempre elegante', category: 'positivo', translation: 'Միշտ էլեգանտ' },
    { phrase: 'Nunca caro', category: 'negativo', translation: 'Երբեք թանկ չէ' },
    { phrase: 'También rosa', category: 'positivo', translation: 'Նույնպես վարդագույն' },
    { phrase: 'Tampoco negro', category: 'negativo', translation: 'Նույնպես սև չէ' },
    { phrase: 'Algún vestido', category: 'positivo', translation: 'Որևէ զգեստ' },
    { phrase: 'Ninguna falda', category: 'negativo', translation: 'Ոչ մի կիսաշրջազգեստ' },
  ] as DictionaryItem[],

  matching: [
    { id: 'm1', original: 'Algo', translation: 'Nada' },
    { id: 'm2', original: 'Alguien', translation: 'Nadie' },
    { id: 'm3', original: 'Siempre', translation: 'Nunca' },
    { id: 'm4', original: 'También', translation: 'Tampoco' },
    { id: 'm5', original: 'Algún', translation: 'Ningún' },
    { id: 'm6', original: 'Alguno', translation: 'Ninguno' },
  ] as MatchingPair[],

  sentences: [
    { 
      id: 's1', 
      positive: 'Busco algo.', 
      sentence: 'No busco ___.', 
      answer: 'nada', 
      translation: 'Ես ոչինչ չեմ փնտրում:',
      options: ['nada', 'algo', 'nadie', 'ninguno']
    },
    { 
      id: 's2', 
      positive: 'Alguien se lo prueba.', 
      sentence: '___ se lo prueba.', 
      answer: 'Nadie', 
      translation: 'Ոչ ոք դա չի փորձում:',
      options: ['Nadie', 'Alguien', 'Nada', 'Nunca']
    },
    { 
      id: 's3', 
      positive: 'Siempre compro aquí.', 
      sentence: '___ compro aquí.', 
      answer: 'Nunca', 
      translation: 'Երբեք այստեղից չեմ գնում:',
      options: ['Nunca', 'Siempre', 'Tampoco', 'Nada']
    },
    { 
      id: 's4', 
      positive: 'Me gusta también.', 
      sentence: 'No me gusta ___.', 
      answer: 'tampoco', 
      translation: 'Ինձ նույնպես դուր չի գալիս:',
      options: ['tampoco', 'también', 'nada', 'nunca']
    },
    { 
      id: 's5', 
      positive: 'No veo nada.', 
      sentence: '___ veo.', 
      answer: 'Nada', 
      translation: 'Ոչինչ չեմ տեսնում (վերափոխում):',
      options: ['Nada', 'No', 'Nadie', 'Nunca']
    },
    { 
      id: 's6', 
      positive: 'No hay nadie.', 
      sentence: '___ hay.', 
      answer: 'Nadie', 
      translation: 'Ոչ ոք չկա (վերափոխում):',
      options: ['Nadie', 'Alguien', 'Nada', 'Nunca']
    },
    { 
      id: 's7', 
      positive: '¿Hay algún zapato?', 
      sentence: 'No hay ___ zapato.', 
      answer: 'ningún', 
      translation: 'Ոչ մի կոշիկ չկա:',
      options: ['ningún', 'algún', 'alguno', 'nada']
    },
    { 
      id: 's8', 
      positive: 'No pago nunca con tarjeta.', 
      sentence: '___ pago con tarjeta.', 
      answer: 'Nunca', 
      translation: 'Երբեք քարտով չեմ վճարում:',
      options: ['Nunca', 'Siempre', 'Tampoco', 'Nada']
    },
    { 
      id: 's9', 
      positive: 'Ella compra algo.', 
      sentence: 'Ella no compra ___.', 
      answer: 'nada', 
      translation: 'Նա ոչինչ չի գնում:',
      options: ['nada', 'algo', 'nunca', 'nadie']
    },
    { 
      id: 's10', 
      positive: 'No quiero ningunas botas.', 
      sentence: '___ botas quiero.', 
      answer: 'Ningunas', 
      translation: 'Ոչ մի կոշիկ (բոթաս) չեմ ուզում:',
      options: ['Ningunas', 'Algunas', 'Nada', 'Nunca']
    },
    { 
      id: 's11', 
      positive: 'Alguien mira el escaparate.', 
      sentence: '___ mira el escaparate.', 
      answer: 'Nadie', 
      translation: 'Ոչ ոք չի նայում ցուցափեղկին:',
      options: ['Nadie', 'Alguien', 'Algo', 'Nunca']
    },
    { 
      id: 's12', 
      positive: '¿Vendes algo?', 
      sentence: 'No vendo ___ .', 
      answer: 'nada', 
      translation: 'Ես ոչինչ չեմ վաճառում:',
      options: ['nada', 'algo', 'alguno', 'nadie']
    },
    { 
      id: 's13', 
      positive: 'Siempre sigo la moda.', 
      sentence: '___ sigo la moda.', 
      answer: 'Nunca', 
      translation: 'Ես երբեք չեմ հետևում նորաձևությանը:',
      options: ['Nunca', 'Siempre', 'Tampoco', 'Nada']
    },
    { 
      id: 's14', 
      positive: 'Tengo algunas ideas.', 
      sentence: 'No tengo ___ idea.', 
      answer: 'ninguna', 
      translation: 'Ես ոչ մի գաղափար չունեմ:',
      options: ['ninguna', 'alguna', 'ningún', 'nada']
    },
    { 
      id: 's15', 
      positive: 'No compro nada hoy.', 
      sentence: '___ compro hoy.', 
      answer: 'Nada', 
      translation: 'Այսօր ոչինչ չեմ գնում:',
      options: ['Nada', 'Algo', 'Nunca', 'Nadie']
    }
  ] as SentenceChallenge[]
};
