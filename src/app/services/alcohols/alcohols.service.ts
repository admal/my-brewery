import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SupabaseService } from '../supabase/supabase.service';

export interface AlkoholTimetableViewModel {
  id: number;
  recipeName: string;
  stages: RecipeStage[],
  createdDate: Date;
}

export interface RecipeStage {
  day: number;
  date: Date;
  name: string;
  description: string;
  done: boolean;
}

export interface AlcoholAddEditModel {
  id: number;
  recipeId: number;
  litres: number;
}

interface AlcoholDbModel {
  id: number;
  recipeId: number;
  litres: number;
  currentStageIndex: number;
}

export interface AlcoholSaveResult {
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlcoholsService {

  constructor(private supabase: SupabaseService) { }

  //maybe id is string: TODO: confirm
  get(id: number): Observable<AlkoholTimetableViewModel> {
    // this.supabase.getClient().from("alcohol")
    // .select()
    // .match({id: id})
    // .sin


    // Beer source: https://birofilia.org/historie/warzenie-piwa-z-zacieraniem.html
    let ret = {
      id: id,
      createdDate: new Date(2021, 9, 4),
      recipeName: "Piwo marcowe",
      stages: [
        {
          day: 0,
          name: "Zacieranie",
          description: "Jednym z głównych celów zacierania jest rozłożenie skrobi, głównego składnika słodu, na fermentowalne cukry proste, dostępne dla drożdży. Wydobyte ze słodu cukry są kluczowe w kolejnych etapach produkcji piwa. Rozkładu cukrów dokonują enzymy z grupy amylaz zawarte w słodzie, powstałe w trakcie kiełkowania zboża. Istotą zacierania jest zmieszanie rozdrobnionego (ześrutowanego) słodu z wodą a następnie stosowanie tzw. przerw. Przerwa to przetrzymywanie mieszaniny słodu i wody w stałej temperaturze przez określony czas. Ma to na celu umożliwienie konkretnym grupom enzymów rozkładu skrobi.",
          done: true
        },
        {
          day: 0,
          name: "Filtracja zacieru",
          description: "Filtracja polega na oddzieleniu scukrzonego roztworu (tzw. brzeczki) od pozostałości zacieru, czyli młóta. W przemysłowych browarach filtracja odbywa się w dużych kadziach filtracyjnych. W warunkach domowych istnieje kilka sposobów oddzielenia młóta od brzeczki, a za najbardziej optymalny uważa się tzw. filtrator z oplotu",
          done: true
        },
        {
          day: 0,
          name: "Wysładzanie",
          description: "Wysładzanie to tak naprawdę kontynuacja procesu filtracji, polegająca na przepłukiwaniu młóta gorącą wodą (76-79°C), w celu wypłukania z wysłodzin jak największej ilości cukrów. Dobrze wykonane wysładzanie to jeden z gwarantów wysokiej wydajności domowej warzelni.",
          done: true
        },
        {
          day: 0,
          name: "Warzenie brzeczki z chmielem",
          description: "W dawnych czasach uznawano piwo za napój zdrowszy od wody. Powód był bardzo prosty: podczas gotowania brzeczki giną wszelkie drobnoustroje. Gotowanie brzeczki, czyli inaczej warzenie, to jeden z najważniejszych etapów tworzenia piwa. Porcja piwa gotowana na raz to jedna warka. W domowym piwowarstwie powszechne jest prowadzenie katalogu uwarzonych przez siebie piw, często wraz z uwagami o ich późniejszym smaku i aromacie oraz użytej recepturze. Często podstawą tych zapisów są właśnie numery kolejnych warek.",
          done: true
        },
        {
          day: 7,
          name: "Przelej piwo po fermentacji burzliwej",
          description: "Po zakończeniu pierwszej fazy fermentacji przelewamy piwo do drugiego, tym razem już szczelnego, fermentora uważając by, na ile to możliwe, nie poruszyć znajdujących się na dnie osadów drożdżowych. Dzięki temu gotowe piwo będzie bardziej klarowne i smaczniejsze.",
          done: false
        },
        {
          day: 21,
          name: "Rozlej piwo po fermentacji cichej",
          description: "Po zakończonej fermentacji cichej należy więc rozlać swoje piwo do butelek. Nareszcie! Pamiętaj jednak, że zakończona fermentacja oznacza brak spadku ekstraktu przez minimum 3 dni, a nie brak „bulkania“ w rurce fermentacyjnej. Niekończące się pytania o „bulkanie“ stały się tematem żartów na forach i grupach piwowarskich.",
          done: false
        },
        {
          day: 35,
          name: "Gotowe!",
          description: "Można pić byku!",
          done: false
        },
      ] as RecipeStage[]

    } as AlkoholTimetableViewModel;
    return of(ret);
  }

  async getEditModel(id: number): Promise<AlcoholAddEditModel> {
    const { data, error } = await this.supabase.getClient().from<AlcoholAddEditModel>("alcohol").select().match({ id: id }).single();
    if (error) {
      throw error;
    }

    return data;
  }

  async save(model: AlcoholAddEditModel): Promise<AlcoholSaveResult> {
    //TODO: refactor that

    if (model.id > 0) {
      const { error } = await this.supabase.getClient().from("alcohol").update(model).match({ id: model.id });

      return {
        success: error == null
      };

    } else {
      delete model.id;
      let saveModel = {
        ...model,
        currentStageIndex: 0
      } as AlcoholDbModel;

      const { error } = await this.supabase.getClient().from("alcohol").insert(saveModel);
      return {
        success: error == null
      };
    }
  }

}
