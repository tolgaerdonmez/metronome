import React, { Component, createContext } from "react";

interface Props {}
interface State {}

export interface MyContextInterface {
	state: State;
	actions: {
		dummyAction: () => void;
	};
}

export const MyContext = createContext({} as MyContextInterface);

export class MyContextProvider extends Component<Props, State> {
	state: State = {};

	dummyAction = () => {
		// mutate state
	};

	render() {
		const context: MyContextInterface = {
			state: this.state,
			actions: { ...this },
		};
		return <MyContext.Provider value={context}>{this.props.children}</MyContext.Provider>;
	}
}
