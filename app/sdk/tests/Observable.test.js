import Observable from '../Observable';
import sinon from 'sinon';
import expect from 'expect';

describe('Observable', () => {
  it('catch an fires event', () => {
    const sut = new Observable();
    const spy = sinon.spy();

    sut.on('hello', spy);
    sut.fire('hello', 'xxx', 'yyy');
    spy.should.have.been.calledWith('xxx', 'yyy');
  });
});