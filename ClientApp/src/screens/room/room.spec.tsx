import * as React from 'react';
import reducer from './room.reducer';
import * as actions from './room.actions';
import { Rooms } from './room.container';
import { RoomActionTypes } from './room.actionTypes';
import configureMockStore from 'redux-mock-store';
import { render, cleanup } from 'react-testing-library';
import thunk from 'redux-thunk';
import axios from 'axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('[@room]', () => {

  describe('[@reducer]', () => {
    it('should return initialstate', () => {
  
      const noMatchingAction = {
        type: '@NoMatch',
        payload: []
      };
      const reducerResult = reducer(undefined, noMatchingAction);
      expect(reducerResult).toEqual([]);
  
    })
  
    it('should return all rooms => [@room]: GetAll', () => {
      
      const getAllAction = {
        type: RoomActionTypes.GetAll,
        payload: [{ name: "A302" }, { name: "C504"}]
      };
      
      const reducerResult = reducer([], getAllAction);
      expect(reducerResult).toEqual(getAllAction.payload);
  
    })
  
  })
  describe('[@actions]', () => {
    it('should return positive GetAll Action', () => {
      const payload = [{ name: 'A402'}];
      const expectedResult = {
        type: RoomActionTypes.GetAll,
        payload
      }

      expect(actions.getAllSuccess(payload)).toEqual(expectedResult);
    })

    it('should populate redux store with all rooms => [@room]: GetAll', async () => {
      const mockData =  [{ name: 'A402' }] ;

      const expectedActions = [
        { type: RoomActionTypes.GetAll , payload: mockData },
      ]

      axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: mockData })
      )

      const store = mockStore({ rooms: [] });

      await store.dispatch(actions.getAll());
      expect(store.getActions()).toEqual(expectedActions);
    })
  });


  describe('[@components]', () => {

    afterEach(cleanup)

    it('should show a list of rooms', async () => {

      const mockData = [{ name: 'A402' }];
      const mockCallback = () => Promise.resolve({ data: mockData })
      axios.get.mockImplementationOnce(mockCallback);

      const { container } = render(<Rooms rooms={mockData} getAll={() => {}} />);
      expect(container);
    })
  });
})