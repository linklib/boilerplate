
import React, { Fragment } from "react";

import PropTypes from "prop-types";

import { Renderer as PrismaCmsRenderer } from "@prisma-cms/front";

import {
  ProductsRoutes,
} from "../routes";


import PrismaCmsComponent from "@prisma-cms/component";

import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import withStyles from "material-ui/styles/withStyles";


export const styles = theme => {

  console.log("theme", theme);

  const {
    palette: {
      primary,
    },
  } = theme;

  return {

    root: {
      color: "red",
  
      "& a": {
        color: primary[400],
        textDecoration: "none",
        
        "&:hover": {
          color: primary[600],
        },
      },
  
    },
  }
}

class DemoAccess extends PrismaCmsComponent {

  static contextTypes = {
    ...PrismaCmsComponent.contextTypes,
    openLoginForm: PropTypes.func.isRequired,
  }

  static propTypes = {
    ...PrismaCmsComponent.propTypes,
    classes: PropTypes.object.isRequired,
  }

  render() {

    const {
      openLoginForm,
    } = this.context;

    const {
      classes,
    } = this.props;

    return <Paper
      style={{
        margin: 10,
        padding: 10,
      }}
    >
      <Typography
        variant="title"
      >
        {this.lexicon("Use login demo and password for ")}
        <a
          href="javascript:;"
          onClick={event => openLoginForm()}
        >
          <span
          >
            demo access
          </span>
        </a>
      </Typography>
    </Paper>

  }
}

export class BoilerplateRenderer extends PrismaCmsRenderer {


  static propTypes = {
    ...PrismaCmsRenderer.propTypes,
    classes: PropTypes.object.isRequired,
  }

  getRoutes() {

    let routers = super.getRoutes();

    routers.unshift({
      exact: true,
      path: "/",
      render: props => this.renderProducts(props),
    });

    routers.unshift({
      exact: false,
      path: "/products",
      render: props => this.renderProducts(props),
    });

    return routers;

  }


  renderProducts(props) {

    return <ProductsRoutes
      {...props}
    />;
  }

  renderRoutes() {

    const {
      user: currentUser,
    } = this.context;

    const {
      classes,
    } = this.props;

    const {
      username,
    } = currentUser || {}

    return <div
      className={classes.root}
    >

      {!currentUser || username !== "demo" ?
        <DemoAccess
          classes={classes}
        />
        :
        null
      }

      {super.renderRoutes()}
    </div>
  }

}

export default withStyles(styles)(BoilerplateRenderer);

