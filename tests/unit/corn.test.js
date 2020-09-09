const costOfTrips = (trip) => trip * 0.25;

test('cost of 4 bags should be 1', () => {
    expect(costOfTrips(4)).toBe(1);
});

test('cost of 8 bags should be 2', () => {
    expect(costOfTrips(8)).toBe(2);
});

test('0 geese and 0 bags should be 0 trips', () => {
	const order = [];
	expect(order).toEqual([])
	expect(costOfTrips(order.length)).toBe(0);
});

test('1 goose and 1 bag should be 3 trips and 0.75 cost', () => {
	const order = ['gf', 'f', 'bf'];
	expect(order).toEqual(['gf', 'f', 'bf'])
	expect(costOfTrips(order.length)).toBe(0.75);
});

test('0 geese and 1 bag should be [x] trips and [y] cost', () => {
	expect(0).toBe(0);
});

test('1 geese and 0 bag should be [x] trips and [y] cost', () => {
	expect(0).toBe(0);
});

test('1 goose and 2 bags should be [x] trips and [y] cost', () => {
	expect(0).toBe(0);
});

test('2 geese and 1 bags should be [x] trips and [y] cost', () => {
	expect(0).toBe(0);
});

test('2 geese and 2 bags should be [x] trips and [y] cost', () => {
	expect(0).toBe(0);
});
