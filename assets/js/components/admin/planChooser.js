import React, { Component } from 'react';


const Plan = (props) => {
    return (
        <div className={"plan panel panel-" + props.plan.class}>
            <div className="panel-heading">
                <img className="img img-responsive pull-right" src={props.plan.image} />
                <h4 className="panel-title"> {props.plan.title} </h4>
            </div>
            <div className="panel-body">
                <p>Plan details</p>
                <small dangerouslySetInnerHTML={{ __html: props.plan.details }} ></small>
            </div>
            <div className="panel-footer text-center">
                <button className="btn btn-default btn-sm" onClick={() => props.onSelect(props.plan)}>
                    Choose me
                </button>
            </div>
        </div>
    )
}

export default class PlanChooser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            plans: [
                {
                    name: "paper-plan",
                    title: "Paper Box",
                    class: "default",
                    details: "It is a simple plan, for basic needs <br /> &nbsp;",
                    image: "/images/paper_box.png"
                },
                {
                    name: "wooden-plan",
                    title: "Wooden box",
                    class: "primary",
                    details: "Good for almost everything you need",
                    image: "/images/wooden_box.png"
                },
                {
                    name: "steel-plan",
                    title: "Steel Box",
                    class: "success",
                    details: "This is the real deal, it is made of steel!!!",
                    image: "/images/steel_box.png"
                },

            ]
        }

        this.handlePlanChoose = this.handlePlanChoose.bind(this);
        this.handlePlanChoose(this.state.plans[0])
    }
    handlePlanChoose(plan) {
        if (this.props.onChoose) {
            this.props.onChoose( plan );
        }
    }

    render() {
        const plans = this.state.plans.map(plan => (
            <div className="col-sm-4 " key={plan.name} >
                <Plan plan={plan} onSelect={this.handlePlanChoose} />
            </div>
        ));


        return (
            <div className="row plan-chooser">
                {plans}
            </div>
        )
    }
}