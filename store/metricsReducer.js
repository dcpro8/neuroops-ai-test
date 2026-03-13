const metricsReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case 'ADD_METRIC':
            return {
                ...state,
                items: [...state.items, action.payload]
            };
        default:
            return state;
    }
};