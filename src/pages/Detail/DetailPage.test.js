import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import Detail from '.';
import { storeData } from '../../constants';

const mockStore = configureStore([thunk]);

it('yüklenme durumunda loader bileşenleri ekrana basılır',()=>{
    const store = mockStore ({
        isLoading:true,
        error:null,
        data:null
    });
    render(
        <Provider store={store}>
            <BrowserRouter>
            <Detail/>
            </BrowserRouter>
        </Provider>
    );
screen.getAllByTestId('card-loader');
screen.getByTestId('header-loader');
});

it('hata durumunda doğru hata bileşeni ekrana basılır',()=>{
    const store = mockStore ({
        isLoading:false,
        error:'Server respoded with status code of 404(undefined)',
        data:null
    });
    render(
        <Provider store={store}>
            <BrowserRouter>
            <Detail/>
            </BrowserRouter>
        </Provider>
    );
    screen.getByText(/Server respoded with/i);
});

it('veri gelme durumunda doğru kartlar ekrana basılır',()=>{
const store =mockStore(storeData);
render(
    <Provider store={store}>
      <BrowserRouter>
        <Detail />
      </BrowserRouter>
    </Provider>
  );
 //* 1) Ülke detayları ekrana geliyor mu?
  // ekrandaki resmi al
  const img = screen.getByRole('img');

  // resmin kaynağı doğru mu kontrol et
  expect(img).toHaveProperty('src', storeData.data.country.flags.png);

  // ülke ismi ekrana geliyor mu?
  const title = screen.getByTestId('country-title');

  // ülke ismi doğru mu?
  expect(title).toHaveTextContent(storeData.data.country.altSpellings[1]);

  //* 2) Kartlar ekrana geliyor mu?

  // nesneyi diziye çevir
  const covidArr = Object.entries(storeData.data.covid);

  // dizideki her bir eleman için key ve value değerleri ekrana basılıyor mu?
  covidArr.forEach((item) => {
    // başlıklar doğru geldi mi?
    screen.getAllByText(item[0].split('_').join(' '));

    // değerler doğru geldi mi?
    screen.getAllByText(item[1]);
  });




});