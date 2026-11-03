import type { Discipline } from '@/types';

/**
 * Discipline definitions. Dance names, holds, round lengths, the class ladder
 * and the Olympic status of breaking are real; everything else on the page that
 * looks like a figure is demo data.
 */
export const disciplines: Discipline[] = [
  {
    id: 'standard',
    tab: { az: 'Standard', en: 'Standard' },
    title: { az: 'Standard rəqsləri', en: 'Standard ballroom' },
    body: {
      az: 'İlk taktdan sonuncuya qədər qapalı mövqedə, meydança boyunca fasiləsiz rəqs xətti ilə ifa olunur. Qalxma-enmə, yanaəyilmə və bədən uçuşu cütlüyü aparır; çərçivə heç vaxt pozulmur.',
      en: 'Danced in closed hold from the first bar to the last, with a continuous line of dance around the floor. Rise and fall, sway and body flight carry the couple; the frame never breaks.'
    },
    dances: [
      { az: 'Vals', en: 'Waltz' },
      { az: 'Tanqo', en: 'Tango' },
      { az: 'Vyana valsı', en: 'Viennese Waltz' },
      { az: 'Slowfox', en: 'Slow Foxtrot' },
      { az: 'Kviksteq', en: 'Quickstep' }
    ],
    facts: [
      { label: { az: 'Rəqs sayı', en: 'Dances' }, value: { az: '5', en: '5' } },
      { label: { az: 'Mövqe', en: 'Hold' }, value: { az: 'Qapalı', en: 'Closed' } },
      { label: { az: 'Tur', en: 'Round' }, value: { az: '90–120 san', en: '90–120 sec' } }
    ],
    image: '/img/gilded-portrait.png',
    seed: 31,
    mode: 'brand'
  },
  {
    id: 'latin',
    tab: { az: 'Latın Amerikası', en: 'Latin American' },
    title: { az: 'Latın Amerikası rəqsləri', en: 'Latin American' },
    body: {
      az: 'Əsasən açıq mövqedə, cütlüyün ayrılıb yenidən birləşməsi ilə ifa olunur. Omba hərəkəti, ayaqların dəqiq işləməsi və ritmik kontrast hər rəqsin xarakterini fərqləndirir.',
      en: 'Danced mostly in open position, the couple separating and returning. Hip action, sharp leg articulation and rhythmic contrast set the character of each dance apart.'
    },
    dances: [
      { az: 'Samba', en: 'Samba' },
      { az: 'Ça-ça-ça', en: 'Cha-cha-cha' },
      { az: 'Rumba', en: 'Rumba' },
      { az: 'Paso doble', en: 'Paso Doble' },
      { az: 'Cayv', en: 'Jive' }
    ],
    facts: [
      { label: { az: 'Rəqs sayı', en: 'Dances' }, value: { az: '5', en: '5' } },
      { label: { az: 'Mövqe', en: 'Hold' }, value: { az: 'Açıq', en: 'Open' } },
      { label: { az: 'Tur', en: 'Round' }, value: { az: '90–120 san', en: '90–120 sec' } }
    ],
    image: '/img/latin-spotlight.png',
    seed: 32,
    mode: 'mag'
  },
  {
    id: 'ten-dance',
    tab: { az: 'Ten Dance', en: 'Ten Dance' },
    title: { az: 'Ten Dance', en: 'Ten Dance' },
    body: {
      az: 'Bir yarışda on rəqs — tam Standard və tam Latın proqramı eyni cütlük tərəfindən, adətən iki günə ifa olunur. Bal rəqsi idmanının ən çətin formatı.',
      en: 'Ten dances in one competition — the full Standard programme and the full Latin programme danced by the same couple, usually over two days. The most demanding format in ballroom dancesport.'
    },
    dances: [
      { az: '5 Standard', en: '5 Standard' },
      { az: '5 Latın', en: '5 Latin' },
      { az: 'İki gün', en: 'Two days' }
    ],
    facts: [
      { label: { az: 'Rəqs sayı', en: 'Dances' }, value: { az: '10', en: '10' } },
      {
        label: { az: 'Yaş qrupu', en: 'Age groups' },
        value: { az: 'Gənclər və yuxarı', en: 'Youth and above' }
      },
      { label: { az: 'Format', en: 'Format' }, value: { az: 'Birləşmiş', en: 'Combined' } }
    ],
    image: '/img/ballroom-spotlight.png',
    seed: 33,
    mode: 'brand'
  },
  {
    id: 'breaking',
    tab: { az: 'Breaking', en: 'Breaking' },
    title: { az: 'Breaking', en: 'Breaking' },
    body: {
      az: 'Bir-birə qarşı qiymətləndirilən battle-lar: toprock, downrock, power move və freeze — DJ-in meydançada ilk dəfə səsləndirdiyi musiqi altında. Breaking Paris 2024-də Olimpiya proqramına daxil olub.',
      en: 'Judged battles one against one: toprock, downrock, power moves and freezes to a DJ set the dancer hears for the first time on the floor. Breaking entered the Olympic programme in Paris 2024.'
    },
    dances: [
      { az: 'B-Boys', en: 'B-Boys' },
      { az: 'B-Girls', en: 'B-Girls' },
      { az: '1 vs 1', en: '1 vs 1' },
      { az: 'Crew battle', en: 'Crew battle' }
    ],
    facts: [
      { label: { az: 'Format', en: 'Format' }, value: { az: 'Battle', en: 'Battle' } },
      { label: { az: 'Meyarlar', en: 'Criteria' }, value: { az: '5', en: '5' } },
      { label: { az: 'Olimpiya', en: 'Olympic' }, value: { az: 'Paris 2024', en: 'Paris 2024' } }
    ],
    seed: 34,
    mode: 'mag'
  },
  {
    id: 'para',
    tab: { az: 'Para rəqs idmanı', en: 'Para DanceSport' },
    title: { az: 'Para rəqs idmanı', en: 'Para DanceSport' },
    body: {
      az: 'Üç formatda təkərli kürsü rəqsi: kombi — təkərli kürsüdə idmançı ayaqüstə partnyorla; duo — iki təkərli kürsü idmançısı; və tək çıxış. Təsnifat zədə sinfinə görə aparılır, rəqslər isə Standard və Latınla eynidir.',
      en: 'Wheelchair dancesport in three formats: combi, where a wheelchair user dances with a standing partner; duo, with two wheelchair users; and single. Classification is by impairment class, and the dances are the same as in Standard and Latin.'
    },
    dances: [
      { az: 'Combi', en: 'Combi' },
      { az: 'Duo', en: 'Duo' },
      { az: 'Single', en: 'Single' },
      { az: 'Class 1 / 2', en: 'Class 1 / 2' }
    ],
    facts: [
      { label: { az: 'Formatlar', en: 'Formats' }, value: { az: '3', en: '3' } },
      { label: { az: 'Siniflər', en: 'Classes' }, value: { az: 'Class 1, Class 2', en: 'Class 1, Class 2' } },
      {
        label: { az: 'Proqramlar', en: 'Programmes' },
        value: { az: 'Standard + Latın', en: 'Standard + Latin' }
      }
    ],
    seed: 35,
    mode: 'brand'
  },
  {
    id: 'formation',
    tab: { az: 'Ansambl', en: 'Formation' },
    title: { az: 'Ansambl (Formation)', en: 'Formation' },
    body: {
      az: 'Səkkiz cütlük vahid komanda kimi bir xoreoqrafiyanı ifa edir: fiqurlar, keçidlər və ilk taktdan sonuncuya qədər aparılan mövzu. Fiqurlara, formasiyalara, sinxronluğa və təqdimata görə qiymətləndirilir.',
      en: 'Eight couples dancing one choreography as a single team: formations, transitions and a theme carried from the first bar to the last. Judged on figures, formations, synchronisation and presentation.'
    },
    dances: [
      { az: '8 cütlük', en: '8 couples' },
      { az: 'Standard', en: 'Standard' },
      { az: 'Latın', en: 'Latin' },
      { az: '6 dəqiqə', en: '6 minutes' }
    ],
    facts: [
      { label: { az: 'Komanda', en: 'Team' }, value: { az: '8 cütlük', en: '8 couples' } },
      { label: { az: 'Çıxış', en: 'Routine' }, value: { az: '6 dəq-dək', en: 'up to 6 min' } },
      { label: { az: 'Meyarlar', en: 'Criteria' }, value: { az: '4', en: '4' } }
    ],
    image: '/img/ballroom-floor-spins.png',
    seed: 36,
    mode: 'mag'
  }
];
