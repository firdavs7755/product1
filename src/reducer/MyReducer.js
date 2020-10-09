export default (state, payload) => {
    switch (payload.type) {
        case 'malumot':
            return {
                ...state,
                productList:[...payload.malumot]
            };
        case 'desc':
            return {
                ...state,
                desc:payload.malumot
            };
        case 'currentDatum':
            return {
                ...state,
                currentProductsImg:payload.datum
            };
         case 'customers':
            return {
                ...state,
                customerList:payload.datum
            };
         case 'modalClose':
            return {
                ...state,
                isMOpen: payload.status,
            };
        case 'modalOpen':
            return {
                ...state,
                isMOpen: payload.status
            };
        case 'slug':
            return {
                ...state,
                currentSlug:payload.slug
            };
            // -------------------------------------------------------------
        case 'comment':
            return {
                ...state,
                commentList:[...state.commentList,payload.comments]
            };
        case 'delComment':
            return {
                ...state,
                commentList:[...payload.delComment]
            };
        case 'isClose':
            return {
                ...state,
                isCMOpen:payload.status
            };
        case 'edit':
            return {
                ...state,
                isCMOpen:payload.status,
                commentId:payload.cId,
                firstName:payload.fName,
                lastName:payload.lName,
                phone:payload.phone,
                commentText:payload.commentText
            };
        case 'regList':
            return {
                ...state,
                regionList:[...payload.data]
            };
        case 'distList':
            return {
                ...state,
                distList:[...payload.data]
            };
        case 'rId':
            return {
                ...state,
                regId:payload.rId
            };
            // -----------------------------
        case 'descClose':
            return {
                ...state,
                descIsOpen: payload.status,
            };
        case 'descOpen':
            return {
                ...state,
                descIsOpen: payload.status,
            };
        default:
            return {
                ...state
            }
    }
}