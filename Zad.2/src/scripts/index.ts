import { PersonTable } from "./person-table";

const advancedSearch = $('.js-adv-search');
const advancedSearchButton = $('.js-adv-search-btn');
const peopleTable = $('div#table');
const tableNext = $('#js-button-next');
const tablePrev = $('#js-button-prev');
const changeRecordsInRow = document.querySelectorAll('.stock-records');
const searchButton = document.getElementById('search');

class Startup {
    public static main(): void {
        advancedSearch.hide();
        advancedSearchButton.click((event) => Startup.onAdvancedSearchClicked(event));
        let table = new PersonTable(peopleTable);
        table.next();
        tableNext.click(() => table.next());
        tablePrev.click(() => table.prev());
        changeRecordsInRow.forEach(
          element => element.addEventListener('click', event => table.changeRecordsInTable(event))
        );
        let sortButton = document.querySelectorAll('.sortWith');
        sortButton.forEach(
          element => element.addEventListener('click', event => table.sortBy(event))
        );
        searchButton.addEventListener('click', event => table.find(document.getElementById('form')));
    }

    private static onAdvancedSearchClicked(event: JQueryEventObject) {
        event.preventDefault();
        // -> powouje, że strona nie będzie się przeładowywac
        if (advancedSearch.is(':visible')) {
            advancedSearch.fadeOut(1000);
        } else {
            advancedSearch.fadeIn(1000);
        }
    }
}

$(Startup.main)
