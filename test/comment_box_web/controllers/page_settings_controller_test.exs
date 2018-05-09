defmodule CommentBoxWeb.PageSettingsControllerTest do
  use CommentBoxWeb.ConnCase

  test "GET /api/page", %{conn: conn} do
    conn =
        conn |> put_req_header("referer", "some strange url")

        
    conn = get conn, "/api/page"
    assert response = json_response(conn, 200)

    assert response["url"] == "some strange url"
    assert response["id"]
    assert response["hashed_url"]
  end

 
end
