import reducer from './room.reducer';
import * as actions from './room.actions';
import { RoomActionTypes } from './room.actionTypes';

describe('[@rooms]', () => {
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
  });
})