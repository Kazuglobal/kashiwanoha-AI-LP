import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

export interface Mentor {
  id: number;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  isBase64?: boolean;
  longDescription: string;
  xUsername?: string;
  website?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  private mentors = signal<Mentor[]>([
    {
      id: 1,
      name: '大舘和史',
      title: '教育×AI、スポーツ×AI、人材育成',
      description: '教育×AI、スポーツ×AI、国際交流の専門家。新たな学びの創造とグローバル人材の育成に取り組む。',
      imageUrl: 'https://picsum.photos/seed/oodate1/400/400',
      longDescription: `モットー：「未来をつくる - Creating the future」

新たな形の学びの創造、AIやテクノロジーを活用した教育革新、国際交流を通じた世界との繋がりの創出に力を入れている。Global Bunnyを運営し、多様性を尊重したグローバル人材の育成に取り組む。

主な実績
■登壇・発表実績
・教育AIサミット2025 衆議院第一会館登壇
・教育AIサミット実例大全 ポスターセッション発表
・東京AI祭2025ハッカソンセミファイナル

■メディア掲載実績
・東奥日報（2025年9月22日）- 自作防災アプリ小学校ワークショップ
・デーリー東北（2025年9月20日）- 防災教育の革新的取り組み
・デーリー東北（2024年8月）- スポーツ×AI特集

■教育プログラムとワークショップ実績
・革新的教育プラットフォーム：デジタル水族館
子どもの創造力と環境教育の融合を実現。子どもたちが描いた魚がスクリーン上でリアルタイムに泳ぎ出すインタラクティブな海洋環境シミュレーション。
・AI時代の教育プログラム人材育成（茨城県開催）
・東京大学院生メンターによる直接指導：実用英語、発信力

■ワークショップ実施実績
・環境問題ワークショップ（小学生）
・防災アプリワークショップ（小学校での実践的防災教育）
・デジタルブック作成ワークショップ（小学生）
・スマートシティと夏休み2024（満席）
・スマートシティと冬休み2024（満席）
・スマートシティと夏休み2025（満席）`,
      website: 'https://globalbunny.vercel.app/'
    },
    {
      id: 2,
      name: 'R太郎',
      title: 'Webアプリ開発者 / AI教育者',
      description: '非エンジニアから独学で年間70本以上のWebアプリを開発。生成AIの可能性と実践的な活用法を発信中。',
      imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAgAElEQVR4nOy957Nc13Xo+f1P/fd77z179iz7XfbYx7Fjx46dOI4T2Umc2InZkAhCBAgQoEBClGhCQoIgQRBCgATIJvskJ3Zix3Ec231s99mznr33e899v9Q9UFXV3bM3s096Uv8wVXV1dVVVXV3VPV19//u/Z7m967vf/e65c+dOaWlpc+fOHRzHBd/3+Xy+WbNmzZw585vf/ObXX3/9tddeq6ysfOSRx956660PPvjg5z//+V/+5V9uvvnmDzzwwO9//3tXV1f/+Z//+X/+53++7rrrZsyY8eCDD37v937vP/7jP27evPlFF120detWtVo9f/7822677bHHHvvOd77z1ltvvfrqq7/zne985zvf+fLLL7/qqqvuu+++jz/++D/+4z8OPOf45ptvvnTp0p/+6Z8+8MADt9xyyxtvvPHll19++eWXv+GGG8aMGfPaa6+99dZbjxw58oUvfOH5558/Y8aMv/zLv3z00Ufvuummm2++ec011/zqV7/60EMPPfjggw8//PDzzz//vPfee08//fRLL730wQcf/PrXv/7yyy9/73vf+8Ybbzz44IOfeOKJ3//+9//iL/7iL/7iL6666qovfeELO3bs+PCHP/zKK6984IEH/uIXv7j++usfeOCBX/ziF7/2ta9dd911n/zkJ2+77bbHHnvsySefPHHiRLPZ/M///M8TJ048+OCDb7vttt/97ne/+c1v/uY3vznhz/Of//mfTz/99I9+9KP/+Z//ufvuu3/xi1988803v/nNb37lK1957LHHHn/88Wuvvfbaay/NmTPnqaeeeuSRR55//vmPP/74scce27FjxxtvvPHAAw98/vOf/8Mf/vDaa69NmTIl/9uZM2ceeuih22677b777vvTn/60fv36d9xxxy9+8YuffvrpZ82a9dNPP126dOmjjz76xBNP/OAHP/jOd77z3Xff/bnPfW7dunXnn3/+s88+u2jRoptuuun111+/9tprb7rpph//+Me/9KUv/fCHP9y6detNN9106tSpS5cu/aEPfehzv//d73539+7dR44ceeKJJ/70pz/dsmXL0aNHP/DAA3/1q1/9+Mc/PnPmzF133XXLLbf8wQ9+MHz48F133fXaa6/1e17z5s179NFHP/nJT5YvX/7OO+9cd91177nnnscee+y3v/3tf/u3f/uHP/xhRUVFjRs3vvLKKx988MHHH398xYoVr7766o4dO66//vqLFy9+7Wtfu/XWWw8fPnzmzJnvfOc7f+ADH3jiiSdWrVo1f/78xx577LXXXuvfsZ/85Cf/+Z//uXv37hdeeOHZZ5/dsmXLdevWffOb3/zNb37zwQcfHHXUUccee2zVqlW/+c1v/uY3v3njjTdeeumlTz/99Jprrnl8fNxtt922bt2655577rvf/e61117bsWPH995777nnnvv5z39+6623fvjDH25YsGDevHk///nPDx06dMmSJU8++WT/mWee+fa3v/3888+/+uqrTzzxxCOPPPLEE0984xvfuGDBgn/913/97ne/+7///e8/+9nP/vjHP+7fv/8nP/nJr3/96xdeeGHOnDnPPvvshz/84fbt2x955JGRI0euWrXqiSee2D8nnnhi8eLFF1100bXXXnvppZdefvnlf/zHH3/xi198//3333jjjddff/3NN988fPjw4cOHb7zxxmOPPfbpJ598+OGHTz/9tFqtdtFFF33uc5/7r//6r8cee2zZsmVXX331tddeu/3223/yk5+sWbPmgw8+uHbt2iuvvDLz5s371re+9Zvf/ObVV1999913v/e9712xYsXixYtfeOGFVatWvf322z/96U8vv/zyAw88MGfOnDvvvHPRokV33HFHpVL55JNP/vSnP73xxhtvvfXWPXv2PPPMM4899ti1114bMGDAjBkz1q1bt2zZstdee23Xrl1/+ctffuqppw4dOnTfffdlSp/nnntu9OjRRx999Pnnn+/Zs2fdunVXXXWVv9+vX78zzjjjiSee2L9nnXXWt771rYceeijf52+//fbVV18dOHCgw+N+7GMf+8QTTyz6r1WrVu+///5HH300n8eRI0duvvnmN998s8/nf+973/vXv/61f/snnnjin/70px/84Adz587dsmXLjz/++Bvf+MbKlSsffPDBb37zm5deeun+++8vLy9/+OGHb7/99pEjR958883/67/+61vf+la1Wn3LLbe8/PLLFyxYMGvWrF/96lf//ve///vf/17//v1//vOf//M///Odd97Zu3fvmTNn/uu//mvVqlU/+MEPfud737tp06annnrqN77xjddee+3JJ5/cs2fPgQceGH/+/PPPP9+/P8Ulf/jDHx5xxBGrVq361re+lSgU3nrrreeee+53v/vdt771rW+//faTTz65d+/eiy666Bvf+MbHHnvstttuu+CCCx599NGf/OQnL7zwwnvvvXfrrbfuu+++H374YWZm5qWXXvroI4/sP3z48Mknnzxt2rQPf/jD+/fv/+c//7lbt24TJ07ctWuX/6P/8i//8r3vfS8/P3/mzJm/+MUvfvWrXz3yyCN/9KMfffOb33zhhRfuvvvuZ5111gMPPPC111578cUXP/fcc0OHDr3wwgs//elPf/Ob3/zu97+f3+9/7GMfe9aznvX000+vXr366tWrf/Ob3zz11FN//OMfv/3223/zN3+zd+/ej3/849dee+2RRx75ta997fnnn3/eeeeddevW/f73v79x48b+/fsfe+yxN9xwQy6XW7ly5Wuvvfbggw9OnTpl7969TzzxxHPPPTdq1CiNRvP1r3997dq1V1111dlnn/3uu+++9dZbv/nNb37lK19ZuHDhH/zgBx/96Efvu+++P/rRjx5//PEnnnjitGnTvvrVr37rW9966KGHnn322T//+c8HDhz43Oc+t3z58meeeeYnP/nJW2655Tvf+c73v//9jz322Msvv3zo0KHnn3/+0KFDb7755r/+67+eOHHijjvu+Fvf+tazzz7bX8pLL720dOnSv/3bvx0zZsyrr776pS996cUXX/zGN77xwx/+sNlsvuCCC/bt23fWWWctWrSoUqkcPnz4ueee+/DDD8+ePXv69Onbtm07ZsyYTz755Msvvzx//vwrVqz41a9+df7559+0adPChQs//PDDzz///GuvvTZjxgw7q3jttddecsmlhx56aPTo0XPOOWfw4MGXXnppxowZ3/zmN99xxx379u277LLLnnnmma1btx577LF/2l988cUPP/ywUqmcffbZt99++4knntiwYcOjjz767W9/e+HChZ179zzssMN+6Utf+soXvvDPf/5zwIAB3/zmN3/uc5973vOed+utt0aNGrX/+c9+9rN/+Zd/+bOf/exHP/rRBQsW/NnPfvaTn/zk/PPPr127tlyu+vfvfe97//jHP/7P//zPzz77bOHChVdfffX+/fvvu+++22+//fzzzz/wwAMvufjiiy/uu++++uqrn3zyyXvvvfepz33uNddc85prrnm33XZ78MEHl1xysf/GG2/8zW9+c/fu3T/4wQ/OmTPnj3/84zfffHPl5uYTTzyxbNmyf/iHf/jpT38aGBhYsGDBwYMHZ8yYMWPGjHvuuecFF1wwfPjwYcMHv/3tb9+/fz9/+Nlqtb777ruvvvpqmzZtPvnkk5///Odvvvnm3NzcX/7yl3/9619Pnz792WefPXToUFVV9Utf+tKMGTM+9thjTz/99JprrvnMZz6zYMGCDz74YJVK5ff7r7/++okTJ/74xz/es2fPSy+9NHv27F/96lfPPPPMm266afXq1V/96lfz+/0PP/zwwx/+ML/fv2TJkhUrVnznO9958cUXn3322e+//z7gW/h8vsls9vbbb7/9ttvWrl27efNmhUIhLy+vnJdffvkyZcr0P+3u7j5//vzp06effPLJJ59//rmenh5x9s6HHnpo0qRJv/e97914441btmxZu3btNddc83/+538uvvjiddddt2PHjmXLlp1//vmTJk362c9+9qKLLnrg9jvvvPO555677rrrXn755ZUrV/bv37969eo33nhj6dKlW7ZsmTZt2rJly+65555bbrmlX6f/6Z/+6Tvf+c4HHnjgsccee+utt2bMmLFy5crXvva1e+65Z/To0Y899ti1114bMGDAjBkz1q1bt2zZstdee23Xrl1/+ctffuqppw4dOnTfffeNHz8+l8v1P+/WrVuvvPJKv4n/+I//uHr16m+//fb1118/Y8aMV155Zf78+Xvuuee22257/vnnL1myZNu2bSdPnvzgBz+4cePG3//+9/3e95///OeXXnrpW9/6Vv9e/POf/7x58+affvqpT6Fw2223zJ49+4EHHnjwwQczJkzoP9xwww0HHXDAmTNn/sM/+A+++OKLBQsWHDp0aPXq1c8+++yBBx645JJLPvaxj911110TJkw455xz3n777V/+8peff/75hQsX7t+//8QTTzzwwAP/9V//tW7dup/85CcfffTRO++884tf/OJFF120ePFi/8UXX/zmN7/5j//4jz/96U8vu+6fP/7n/zP//zP999//5e//OUnn3xy9OjRe++994Uv/jP//zP559//sYbb3z//ff/2c9+9utf//qZZ5559tln/+Uv/xgyZMiPf/zjd955Z+HChS+88EL/3n/+85//+Mc/fve73z388MPvvPPOgQMHfvOb37zoootuuOGGCy+8sH/+j370o5/85Cdt2/bDH/7w8ccf79Onz/PP/9i/u/DCC7dt2/b0008//PDDf/Ob3zz22GPvvvvuCy64YMGCBddcc43/3w/+4A+//OUvv/DCC0ePHn3uc5/7rW99a/ny5S+99NK77777+OOPz549++WXX77jjjtuu+22ZcuWnXvuuTfeeGPhwoX/+c9/fu973/vRj370yCOPPPfccw8fPvylL33pT3/60z/+8Y9+65YtW/bu3Xveeee94hWvePHFF19//fWLFy/+9a9/3bhx45NPPtm6deubbrqpd+/eCy644FNPPXXqqacOGTLkn//8p52dnZubi5n3wAMPfP3rX/8v//Iv23/m4uJiZmZm+PDhU6ZMmT59+rJly1599dV//+//vvLKK6+66qo777yzVq1ahYWFeXl5lZaWJkyYMGrUqL/7u797+eWXFy9eXFZWdsstt/z7v/978+bNP/nJT/7u7/7ulVde2b9/f35+fqVSceutt37ve9/77ne/e+edd37xi1/8/ve/P3369Ntvv33FFVfs37+/srKyUCg85phj9u/ff9FFF33605/+xje+cebMmddee+0LL7xw1113XXXVVV/96lefeuqphw4deuSRRx555JHHHnvshz/84V133bVhw4ZPPvlkf+0/+MEPfvbznz/00EP/7d/+7ec//3nDhg3/+I//eMuWLT//+c+nnHJK9yX+/d//fefOnddeey3/L3PmzHnz5v3N3/zNV77ylX/3d3+3bt26a6655uWXX37mmWeeffbZH/7wh4GBgXnz5v3oRz8qFovf+ta3fvazn73nnnsGDBjw7W9/+1lnnTVAwLnnnvsTn/jEnj17nnrqqQULFjzw9vXXX7/iiiv+8z//c9lllz388MM//elP33fffTfddNO0adMmTZp0/vnnHzVq1CmnnPLtb3974cLFvfse8MADCxYseN555y1evHjVqlXf/e53X3nllT/96U8vu+6fP/7n/zP//zP999//5e//OUnn3xy9OjRe++994Uv/jP//zP559//sYbb3z//ff/2c9+9utf//qZZ5559tln/+Uv/xgyZMiPf/zjd955Z+HChS+88EL/3n/+85//+Mc/fve73z388MPvvPPOgQMHfvOb37zoootuuOGGCy+8sH/+j370o5/85Cdt2/bDH/7w8ccf79Onz/PP/9i/u/DCC7dt2/b0008//PDDf/Ob3zz22GPvvvvuCy64YMGCBddcc43/3w/+4A+//OUvv/DCC0ePHn3uc5/7rW99a/ny5S+99NK77777+OOPz549++WXX77jjjtuu+22ZcuWnXvuuTfeeGPhwoX/+c9/fu973/vRj370yCOPPPfccw8fPvylL33pT3/60z/+8Y9+65YtW/bu3Xveeee94hWvePHFF19//fWLFy/+9a9/3bhx45NPPtm6deubbrqpd+/eCy644FNPPXXqqacOGTLkn//8p52dnZubi5n3wAMPfP3rX/8v//Iv23/m4uJiZmZm+PDhU6ZMmT59+rJly1599dV//+//vvLKK6+66qo777yzVq1ahYWFeXl5lZaWJkyYMGrUqL/7u797+eWXFy9eXFZWdsstt/z7v/978+bNP/nJT/7u7/7ulVde2b9/f35+fqVSceutt37ve9/77ne/e+edd37xi1/8/ve/P3369Ntvv33FFVfs37+/srKyUCg85phj9u/ff9FFF33605/+xje+cebMmddee+0LL7xw1113XXXVVV/96lefeuqphw4deuSRRx555JHHHnvshz/84V133bVhw4ZPPvlkf+0/+MEPfvbznz/00EP/7d/+7ec//3nDhg3/+I//eMuWLT//+c+nnHJK9yX+/d//fefOnddeey3/L3PmzHnz5v3N3/zNV77ylX/3d3+3bt26a6655uWXX37mmWeeffbZH/7wh4GBgXnz5v3oRz8qFovf+ta3fvazn73nnnsGDBjw7W9/+1lnnTVAwLnnnvsTn/jEnj17nnrqqQULFjzw9vXXX7/iiiv+8z//c9lllz388MM//elP33fffTfddNO0adMmTZp0/vnnHzVq1CmnnPLtb3974cLFvfse8MADCxYseN555y1evHjVqlXf/e53X3nllT/96U/vu+++b33rW3/+859nn3122rRpzz777Jprrjk4OLi5uTlu09zc3MzMjJ8//o1v/P73v/vss0+nTZt2zjnnvPrqq4GBgQULFnzvec978cUXP/nkkxdddLH/1r/5m7+ZNm1an/rc/H3ue/fcc//6179eu3bt4sWLd+/e/d3vfveJJ57Yv2eccca1114bMGDAnDlz9uzZ89prr3311VcXLVp05MiRffv2/de//nWz2fyTn/zkxz/+8d///vefeOKJJ5988rrrrvvRj350+/btTzjhha9+9as///nP77rrrtdff/3ixYu/8IUvPP744wcccADfgx/84LnnnjvxxBP7z+3t27c/+clP/v73v//FL37x1Vdf3bp1a7Vadd55573yla988MEHP/744/fdc0cffXTvvfcOGDDgm9/85osvvtij0ViyZMknnnjij3/849WrV3/uc5977LHH7rzzzi9/+cuTJk168sknl1xyycYbbzzssMNuu+22q6++uu9///tf+MIX/tGPfvSBD3zgpz/96fvuu+/AAw8cPXp0uVzuD3+T9O/f/zOf+cxjjz120EEH/eY3v3nnnXd+9atfvfLKK7/5zW++9NJLr7766qGHHnrNNddee+21f/3Xf91xxx3f+MY37rrrrvfee+8vf/nLxx9/fPny5TfffHPRokVLly695pprzjjjjNtuuy33/d5www2X/H/4r/1qtbpy5cr+/fu/973v3XvvvT/5yU++/PLLm266af78+XvuueeGG264//77z58//+Uvf/nkk09OmDBhyZIlV1555Q9/+ODBgwc/eumfM2X/n/lX3v/cAAAAASUVORK5CYII=',
      isBase64: true,
      longDescription: '非エンジニアから独学で年間70本以上のWebアプリや創作コンテンツを開発。\n2025年にはシリコンバレーへ渡り、自作アプリを発表するなど活動の舞台を世界へ広げる。\n\n「日本中に輝く目を」をビジョンに掲げ、生成AIの可能性と実践的な活用法を発信中。\n\n実績\n• Cursorアプリ開発ハッカソン MVP受賞\n• 東京AI祭2025ハッカソンセミファイナル\n• 教育AIサミット2025 登壇（国会議事堂隣・衆議院議員会館）\n• 北海道自治体職員向け 生成AI研修 講師\n• AIエージェントユーザー会（AIAU） 登壇\n• ChatGPT研究所オフ会 登壇\n• そのほか企業研修・勉強会・イベント多数',
      xUsername: 'masukusoro',
      website: 'http://R-TARO.com'
    },
  ]);

  getMentors(): Mentor[] {
    return this.mentors();
  }

  getMentorById(id: number): Mentor | undefined {
    return this.mentors().find(m => m.id === id);
  }
}
