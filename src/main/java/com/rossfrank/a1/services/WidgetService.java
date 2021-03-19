package com.rossfrank.a1.services;

import com.rossfrank.a1.models.Widget;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {
    private List<Widget> widgets = new ArrayList<>();
    {
        Widget w1 = new Widget("123l", "123", "1l", "HEADING", 1, "Welcome to Widgets");
        Widget w2 = new Widget("234l", "234", "1l", "PARAGRAPH", 1, "This is a paragraph");
        Widget w3 = new Widget("345l", "345", "2l", "HEADING", 2, "Welcome to WebDev");
        Widget w4 = new Widget("456l", "456", "2l", "PARAGRAPH", 1, "Lorem ipsum");
        widgets.add(w1);
        widgets.add(w2);
        widgets.add(w3);
        widgets.add(w4);
    }

    public Widget createWidget(String id, Widget widget) {
        widget.setTopicId(id);
        widgets.add(widget);
        return widget;
    }
    public List<Widget> findAllWidgets() {
        return widgets;
    }

    public List<Widget> findWidgetsForTopic(String tId) {
        List<Widget> ws = new ArrayList<>();
        for(Widget w: widgets) {
            if(w.getTopicId().equals(tId)) {
                ws.add(w);
            }
        }
        return ws;
    }
    public Widget findWidgetById(String id) {
        for(Widget w: widgets) {
            if(w.getId().equals(id)) {
                return w;
            }
        }
        return null;
    }

    public Integer updateWidget(String id, Widget newWidget) {
        for(int i=0; i<widgets.size(); i++) {
            Widget w = widgets.get(i);
            if(w.getId().equals(id)) {
                widgets.set(i, newWidget);
                return 1;
            }
        }
        return -1;
    }
    public Integer deleteWidget(String id) {
        int index = -1;
        for(int i=0; i<widgets.size(); i++) {
            Widget w = widgets.get(i);
            if(w.getId().equals(id)) {
                index = i;
            }
        }
        if(index >= 0) {
            widgets.remove(index);
            return 1;
        }
        return -1;
    }
}